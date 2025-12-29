---
title: The 5 levels of optimization - EDM115 blog
meta:
  - name: article:published_time
    content: 2025-12-22T14:00:00Z
  - name: description
    content: The 5 "levels" of optimization (no, it didn't drive me insane !)
  - name: summary
    content: A journey through the 5 stages of optimization I went through while optimizing a CLI tool I made, because apparently I love to over-engineer things.
  - name: tags
    content: typescript, optimization, performance, cli
---

[[toc]]

# The 5 "levels" of optimization (no, it didn't drive me insane !)
This blog post will detail the 5 ~~stages of grief~~ levels I went through when trying to optimize a function for a CLI tool I built ([`monorepo-hash`](https://github.com/EDM115/monorepo-hash)).
> [!NOTE]  
> I'm not claiming these are the 5 sacred commandments of performance engineering, nor am I saying that any of these accurately represent their associated "career level", they're just depicted as quick landmarks.  
> This is just the path I ended up taking, with a couple of wrong turns, a bit of ego, and a decent amount of "surely this will be faster", followed by immediate regret.  
> Also note that a good chunk of the CLI has been made with the assistance of AI models, so that's an easy way to spot mistakes and things to optimize :smile:

Is the title clickbait ? If you think so, it means that it worked anyway :)

## Yet another CLI tool ?
Yeah, oopsies... :sweat_smile:  
I made this tool during my last internship, more details can be found in its README.  
All that you should know is :
1. It generates hashes for the different workspaces of your monorepo, with support for internal transitive dependencies
2. It was just a quick script written to solve an issue but I wanted to turn it into its own thing
3. It was more of an excuse for me to make a CLI tool, mess with some interesting new tech (rolldown, bun, ...) and try to see how far I could optimize it (with benchmarks backing it up)

As such, it needs to be able to process potentially lots of files, fast enough so it's not visible to the user (ex when used as a pre-commit hook).  
Implementing it in TypeScript is... *debatable* if performance is the whole point, but that's another fight :hand_over_mouth:.

## Our focus today
Since the code spans nearly `1k LoC` (excluding comments), we won't cover everything here. We will only focus on the code that computes per-file hashes and returns them.  
There are some subtleties tho, that won't change between each implementation :
1. The returned paths should be POSIX-style. We use a custom function for this that's been simplified here (we have a cache in the actual script)
2. It's async and exported for programmatic usage
3. We initialize the returned record to `Object.create(null)` instead of `{}` to skip proto initialization
4. We exit early if the list is empty

The shell of that function looks like this :
```ts
import { sep } from "node:path"

/**
 * Normalize a path for display purposes (always POSIX-style separators)
 * @param p The path to normalize
 * @returns The normalized path
 */
export function displayPath(p: string): string {
  return sep === "/"
    ? p
    : p.replace(/\\/g, "/")
}

/**
 * For a given `dir` and list of relative file paths (`fileList`), compute per-file SHA-256 on (normalizedPath + rawContent)
 * Always returns a map : { "posix/rel/path": "hex" }
 * @param dir The absolute path to the directory containing the files
 * @param fileList An array of relative file paths within the directory
 * @returns A promise that resolves to a record mapping POSIX relative paths to their SHA-256 hex hashes
 */
export async function computePerFileHashes(
  dir: string,
  fileList: string[],
): Promise<Record<string, string>> {
  const result: Record<string, string> = Object.create(null)

  if (fileList.length === 0) {
    return result
  }

  // process...

  return result
}
```

## Level 1 : Sequential processing (new grad)
Pretty straightforward, just iterate over the files and compute their hashes bro :
```ts
import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export async function computePerFileHashes(
  dir: string,
  fileList: string[],
): Promise<Record<string, string>> {
  const result: Record<string, string> = Object.create(null)

  if (fileList.length === 0) {
    return result
  }

  for (const file of fileList) {
    const norm = displayPath(file)
    const fullPath = join(dir, file)
    const content = await readFile(fullPath)
    const fileHash = createHash("sha256")
      .update(norm)
      .update(content)
      .digest("hex")

    result[norm] = fileHash
  }

  return result
}
```
Indeed, very simple. But you can already smell the issue : it's slow. *Very* slow :snail:.  
The more bytes you have to read & hash, the longer it takes (roughly $\mathcal{O}(totalBytesRead)$ + some overhead).

## Level 2 : Streaming like we're Netflix (the vibe coder)
A new foe has entered the chat !  
The vibe coder ran the program and it was slow as shit, so he asked his buddy Claude Code to "make it faster, no mistakes plz ! :pleading_face:".  
And this is where the *false* good idea comes in : **streaming the files**.  
You see, one bottleneck here could be that we're waiting for the file to be entirely loaded into memory before we can compute its hash. And if there's a **massive** file to process, loading it from disk into memory could take some time, slowing the program down. In that case, streaming can absolutely help with memory and responsiveness, Node.js streams are literally built for chunked processing.  
So here's what ~~the vibe coder~~ Claudy came up with :
```ts
import { createHash } from "node:crypto"
import { createReadStream } from "node:fs"
import { join } from "node:path"

export async function computePerFileHashes(
  dir: string,
  fileList: string[],
): Promise<Record<string, string>> {
  const result: Record<string, string> = Object.create(null)

  if (fileList.length === 0) {
    return result
  }

  for (const file of fileList) {
    const norm = displayPath(file)
    const fullPath = join(dir, file)
    const h = createHash("sha256")

    h.update(norm)

    await new Promise<void>((resolve, reject) => {
      const stream = createReadStream(fullPath)

      stream.on("data", (chunk) => h.update(chunk))
      stream.on("error", reject)
      stream.on("end", () => resolve())
    })

    result[norm] = h.digest("hex")
  }

  return result
}
```
When presented with the opportunity to make the code faster, nearly all AI models will suggest file streaming (GPT models more aggressively than others btw).  
But why is this a bad idea ? Well it would be better *if* we were processing **massive files**. However the majority of them are code files, so text, and at best we have some fonts, images, maybe 1 or 2 demo videos laying around in the repo... So the event/chunk overhead isn't "free", and definitely not enough to be beneficial.
> [!NOTE]  
> Btw, [benchmarks](https://github.com/EDM115/monorepo-hash#rocket-benchmarks) show that the extra time it takes to create a stream of data and then feeding it to the hashing function is overall worse every time, and gets even worse on very large repos, up to twice as slow (check version `1.2.0`).

## Level 3 : Parallelism ftw ! (junior dev)
The junior dev is tasked with making this function faster, and he thinks (rightfully) that it's the perfect time to implement something he learned recently : **parallelism**.  
Instead of processing files sequentially, we will process **all of them** at the same time !
```ts
import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export async function computePerFileHashes(
  dir: string,
  fileList: string[],
): Promise<Record<string, string>> {
  if (fileList.length === 0) {
    return Object.create(null)
  }

  const entries = await Promise.all(
    fileList.map(async (file) => {
      const norm = displayPath(file)
      const fullPath = join(dir, file)
      const content = await readFile(fullPath)

      const fileHash = createHash("sha256")
        .update(norm)
        .update(content)
        .digest("hex")

      return [norm, fileHash] as const
    }),
  )

  return Object.fromEntries(entries) as Record<string, string>
}
```
And indeed, this **is** way faster !  
However, it comes with some issues :
- We *might* completely saturate the I/O queue of Node.js. You see, you can queue up a ridiculous amount of filesystem work. In Node.js, filesystem operations are backed by libuv's [`threadpool`](https://docs.libuv.org/en/latest/threadpool.html) (with a default size of 4), so you can easily create pressure without actually getting infinite throughput
- The disk's cache could be quickly exhausted, drastically affecting ~~fishing season~~ read performance
- With enough files being processed/things running outside of this script, we can just fill all the available memory, causing the program to crash, let alone running into file descriptor limits (hello `EMFILE` :wave:)

## Level 4 : Batching our way in (mid-level dev)
The project grew and the mid-level dev noticed the script crashing in the pipeline, so he decided to take matters into his own hands.  
Instead of raw parallelism, we will process **batches** of files :
```ts
import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export async function computePerFileHashes(
  dir: string,
  fileList: string[],
): Promise<Record<string, string>> {
  const result: Record<string, string> = Object.create(null)
  const CONCURRENCY = 100

  if (fileList.length === 0) {
    return result
  }

  // Pre-normalize paths to avoid repeated split/join
  const normalized = fileList.map((rel) => [
    rel,
    displayPath(rel),
  ])

  for (let i = 0; i < normalized.length; i += CONCURRENCY) {
    const batch = normalized.slice(i, i + CONCURRENCY)

    // oxlint-disable-next-line no-await-in-loop : Needed to not blow up memory with too many concurrent reads
    const partial = await Promise.all(batch.map(async ([ rel, norm ]) => {
      const fullPath = join(dir, rel)
      const content = await readFile(fullPath)
      const fileHash = createHash("sha256")
        .update(norm)
        .update(content)
        .digest("hex")

      return [ norm, fileHash ] as [string, string]
    }))

    for (const [ norm, partialHash ] of partial) {
      result[norm] = partialHash
    }
  }

  return result
}
```
Here we have the **best** of both worlds : process X files at once, but don't load way too many files from that damn repo into memory !  
Now where does that magic number `100` come from ? Saying that I pulled it out of my ass wouldn't be *that* far-fetched, but it comes down mostly to tests. Too low and you hurt perf, too high and you blow up memory. It felt like a decent compromise after multiple test runs.  
Does pre-normalizing the paths actually help ? *Who knows* :man_shrugging:.  
Is there a cleaner way to write this ? *Probably* :face_with_peeking_eye:.

## Level 5 : Proper concurrency (senior dev)
During runs, the senior dev notices some inconsistencies in execution times and decides to take a look at the script. And he has an idea to make the process even faster : a **worker pool**.  
Basically, instead of taking 100 files out of the list, processing them all, *then* taking the next 100 files and repeating over and over again, we create 100 queues of files (workers) to be processed with only 1 spot available. Then, each file on the list gets assigned to the first free spot.  
In other words, instead of "100 at a time, then wait for the slowest one", we keep **100 workers** busy. When one finishes, it grabs the next file :
```ts
import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

/**
 * Map over an array with a concurrency limit
 * @param items The array of items to process
 * @param limit The maximum number of concurrent operations
 * @param fn The async function to apply to each item
 * @returns A promise that resolves to an array of results
 */
export async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = Array.from({ length: items.length })
  let idx = 0

  async function worker() {
    while (idx < items.length) {
      const current = idx++

      // oxlint-disable-next-line no-await-in-loop
      results[current] = await fn(items[current])
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))

  return results
}

export async function computePerFileHashes(
  dir: string,
  fileList: string[],
): Promise<Record<string, string>> {
  const result: Record<string, string> = Object.create(null)
  const CONCURRENCY = 100

  if (fileList.length === 0) {
    return result
  }

  const entries = await mapLimit(fileList, CONCURRENCY, async (file) => {
    const norm = displayPath(file)
    const fullPath = join(dir, file)
    const content = await readFile(fullPath)
    const fileHash = createHash("sha256")
      .update(norm)
      .update(content)
      .digest("hex")

    return [ norm, fileHash ] as const
  })

	for (const [ norm, partialHash ] of entries) {
		result[norm] = partialHash
	}

  return result
}
```
This is, so far, the best I could do.  
In level 4, if one file in the batch takes forever to be processed, the other 99 are done and the next batch is just... waiting for *that one guy* :triumph:.  
If that happens here, that file will clog **one** worker, but the rest keep going through the queue as if nothing ever happened.

## Conclusion
So those "5 levels" were basically :
- **Level 1** : I did a `for` loop and I'm proud of it ^^ (good boy :palm_down_hand:)
- **Level 2** : STREAMS !!! (great for memory/huge files, not automatically faster for lots of small ones)
- **Level 3** : `Promise.all()` go brrrr (until your machine starts sweating :cold_sweat:)
- **Level 4** : Oh shit, let's not spawn thousands of reads at once (batching to do damage control)
- **Level 5** : Keep X workers busy and stop waiting for the slowest guy in the batch (worker pool/concurrency-limited queue)

The main lesson for me : **optimization is mostly about picking the right bottleneck to bully**.  
Sometimes the bottleneck is "you're doing things one by one", sometimes it's "you're doing *too much* at once", and sometimes it's "you added complexity because it felt fast", which is apparently what I'm really good at doing :face_holding_back_tears:.  
Also : streaming is not a magic "go faster" button. If your files are mostly small text blobs, you might just be paying overhead to feel productive :clown_face:.  
If you take one thing from this post : **measure first, meme later** (ok fine, measure *and* meme, but in that order :wink:).  
Anyway, the current version (level 5) is where I landed, and it's the best combo I've found so far between "fast", "doesn't explode in CI", and "I can still read this code without crying" (sorta kinda :smiling_face_with_tear:).  
If you want the actual numbers/setup, the repo has benchmarks and the rest of the context. And if you've got a better trick... send it, I'm ready to over-optimize this again for no reason whatsoever :sunglasses:.
