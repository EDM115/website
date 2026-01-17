import {
  readdir,
  readFile,
  writeFile,
  mkdir,
} from "node:fs/promises"
import { join } from "node:path"
import { performance } from "node:perf_hooks"

import grayMatter from "gray-matter"

import { nameToEmoji } from "gemoji"
import {
  close as closePagefind,
  createIndex,
} from "pagefind"
import { Temporal } from "temporal-polyfill"

import type {
  BlogPostMeta,
  DocfindSchema,
  Frontmatter,
  FrontmatterMeta,
  FileInfo,
  ParsedPost,
} from "./app/types"

function codeToEmoji(match: string, name: string): string {
  return nameToEmoji[name] ?? match
}

function cleanupMarkdown(content: string, singleLine: boolean): string {
  let text = content

  text = text
    // Remove backslash on escaped markdown characters
    .replace(/\\([\\`*_{}[\]()#+\-.!])/g, "$1")
    // Remove headers
    .replace(/^#+\s+/gm, "")
    // Remove images and keep alt text if it exists
    .replace(/!\[([^\]]*)\]\((?:[^)\\]|\\.)*\)/g, (_, alt) => (alt
      ? `[${alt.trim()}]`
      : ""))
    // Remove bold
    .replace(/\*\*(.+?)\*\*/g, "$1")
    // Remove italic
    .replace(/\*(.+?)\*/g, "$1")
    // Remove strikethrough
    .replace(/~~(.+?)~~/g, "$1")
    // Remove ins
    .replace(/\+\+(.+?)\+\+/g, "$1")
    // Remove mark
    .replace(/[=]{2}(.+?)[=]{2}/g, "$1")
    // Remove spoilers
    .replace(/!!(.+?)!!/g, "$1")
    // Remove links
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")
    // Remove inline code
    .replace(/`(.+?)`/g, "$1")
    // Replace :emoji_codes: with emoji chars
    .replace(/:([a-zA-Z0-9_+-]+):/g, codeToEmoji)
    // Remove html tags
    .replace(/<\/?[^>]+(>|$)/g, "")
    // Remove table of contents markers
    .replace(/(\n)?\[\[toc\]\](\n)?/gi, "\n")
    // Remove leading and trailing newlines
    .replace(/^\n+|\n+$/g, "")

  if (singleLine) {
    text = text
      // Replace multiple newlines with a single newline
      .replace(/\n{2,}/g, "\n")
      // Replace newlines with spaces
      .replace(/\n/g, " ")
      // Replace multiple spaces with a single space
      .replace(/ {2,}/g, " ")
      // Trim whitespace
      .trim()
  }

  return text
}

function extractExcerpt(content: string, maxLength = 200): string {
  const text = cleanupMarkdown(content, true)

  return text.length > maxLength
    ? `${text.slice(0, maxLength)}...`
    : text
}

function parsePublishedTime(publishedTime: Date | undefined): {
  date: string;
  link: string;
} {
  if (!(publishedTime instanceof Date)) {
    return {
      date: "", link: "",
    }
  }

  const instant = Temporal.Instant.from(publishedTime.toISOString())
  const date = instant.toZonedDateTimeISO("UTC")
    .toPlainDate()
  const year = date.year.toString()
  const month = date.month.toString()
    .padStart(2, "0")
  const day = date.day.toString()
    .padStart(2, "0")

  return {
    date: `${year}-${month}-${day}`,
    link: `/${year}/${month}/${day}`,
  }
}

function stringifyMetaValue(value: FrontmatterMeta[keyof FrontmatterMeta]): string {
  if (value instanceof Date) {
    return Temporal.Instant.from(value.toISOString())
      .toZonedDateTimeISO("UTC")
      .toPlainDate()
      .toString()
  }

  return value.toString()
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/")
}

function parseFilePath(relativePath: string): FileInfo | null {
  const normalized = normalizePath(relativePath)
    .replace(/\.md$/, "")
  const [ year, fileName ] = normalized.split("/", 2)

  if (!year || !fileName) {
    return null
  }

  const match = fileName.match(/^(\d{2})-(\d{2})-(.+)$/)

  if (!match) {
    return null
  }

  const [ , month, day, slug ] = match

  return {
    year,
    month,
    day,
    slug,
  }
}

async function parseBlogPost(
  filePath: string,
  relativePath: string,
  isTelegram: boolean,
): Promise<ParsedPost> {
  const content = await readFile(filePath, "utf-8")
  const frontMatterParsed = grayMatter(content)
  // oxlint-disable-next-line no-unsafe-type-assertion
  const frontmatter = frontMatterParsed.data as Frontmatter
  const markdownContent = frontMatterParsed.content
  const normalizedRelativePath = normalizePath(relativePath)
  const fileInfo = parseFilePath(normalizedRelativePath)

  // Extract metadata
  const publishedTime = frontmatter.meta.find((metaItem) => metaItem.name === "article:published_time")?.content
  const summary = frontmatter.meta.find((metaItem) => metaItem.name === "summary")?.content || ""

  // Extract tags from frontmatter meta
  let tags: string[] = []
  const metaTags = frontmatter.meta.find((metaItem) => metaItem.name === "tags")?.content

  if (metaTags) {
    const additionalTags = metaTags.split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    tags = [...new Set([ ...tags, ...additionalTags ])]
  }

  // Parse date and link from published time
  const {
    date: parsedDate, link: dateLink,
  } = parsePublishedTime(publishedTime)
  let resolvedDate = parsedDate

  if (!resolvedDate && fileInfo) {
    resolvedDate = `${fileInfo.year}-${fileInfo.month}-${fileInfo.day}`
  }

  let link = ""

  if (isTelegram) {
    if (fileInfo) {
      link = `/blog/telegram/${fileInfo.year}/${fileInfo.month}/${fileInfo.day}/${fileInfo.slug}`
    } else if (resolvedDate) {
      const [ year, month, day ] = resolvedDate.split("-")
      const filename = normalizedRelativePath.split("/")
        .pop()
        ?.replace(/\.md$/, "") || ""
      const slug = filename.replace(/^(\d{2})-(\d{2})-/, "") || filename

      link = `/blog/telegram/${year}/${month}/${day}/${slug}`
    } else {
      const fallback = normalizedRelativePath.replace(/\.md$/, "")

      link = `/blog/telegram/${fallback}`
    }
  } else {
    if (fileInfo) {
      link = `/blog/${fileInfo.year}/${fileInfo.month}/${fileInfo.day}/${fileInfo.slug}`
    } else if (parsedDate) {
      const filename = normalizedRelativePath.split("/")
        .pop()
        ?.replace(/\.md$/, "") || ""
      const slug = filename.split("-")
        .splice(2)
        .join("-")

      link = `/blog${dateLink}/${slug}`
    } else {
      link = `/blog/${normalizedRelativePath.replace(/\.md$/, "")}`
    }
  }

  // Use the description from meta as the title if available
  const title = isTelegram
    ? `#${frontmatter.meta.find((metaItem) => metaItem.name === "id")?.content}`
    : frontmatter.meta.find((metaItem) => metaItem.name === "description")?.content || frontmatter.title

  const excerpt = summary || extractExcerpt(markdownContent, 200)

  const pagefindMeta = frontmatter.meta.reduce<Record<string, string>>((acc, metaItem) => {
    acc[metaItem.name] = stringifyMetaValue(metaItem.content)

    return acc
  }, {})
  const pagefindTags = tags
    .map((tag) => tag.trim()
      .toLowerCase())
    .filter((tag) => tag.length > 0)

  const post: BlogPostMeta = {
    id: normalizedRelativePath.replace(/\.md$/, "")
      .replace(/\//g, "-"),
    title,
    date: resolvedDate,
    tags,
    path: normalizedRelativePath,
    link,
    excerpt,
  }

  return {
    post,
    markdownContent,
    publishedTime: publishedTime instanceof Date
      ? Temporal.Instant.from(publishedTime.toISOString()).epochMilliseconds
      : 0,
    pagefindMeta,
    pagefindTags,
  }
}

async function scanDirectoryWithTime(
  baseDir: string,
  subDir = "",
  isTelegram = false,
): Promise<ParsedPost[]> {
  const currentDir = join(baseDir, subDir)

  try {
    const entries = await readdir(currentDir, { withFileTypes: true })

    const results = await Promise.all(entries.map(async (entry) => {
      const entryPath = join(subDir, entry.name)

      if (entry.isDirectory()) {
        return await scanDirectoryWithTime(baseDir, entryPath, isTelegram)
      }

      if (entry.isFile() && entry.name.endsWith(".md")) {
        const fullPath = join(currentDir, entry.name)
        const parsed = await parseBlogPost(fullPath, entryPath, isTelegram)

        return [parsed]
      }

      return []
    }))

    return results.flat()
  } catch (error) {
    console.error(`❌ Error scanning directory ${currentDir} :`, error)

    return []
  }
}

async function scanDirectoryParsed(
  baseDir: string,
  subDir = "",
  isTelegram = false,
): Promise<ParsedPost[]> {
  const postsWithTime = await scanDirectoryWithTime(baseDir, subDir, isTelegram)

  // Sort antichronologically by publish time
  postsWithTime.sort((a, b) => b.publishedTime - a.publishedTime)

  return postsWithTime
}

async function generateBlogData(): Promise<{
  blogParsed: ParsedPost[];
  telegramParsed: ParsedPost[];
}> {
  console.log("🔄️ Generating blog metadata...\n")

  const blogDir = join(process.cwd(), "app", "components", "blog")
  const telegramDir = join(process.cwd(), "app", "components", "blog", "telegram")
  const outputDir = join(process.cwd(), "app", "assets", "data")

  // Parse regular and telegram blog posts to reuse them later
  const allBlogParsed = await scanDirectoryParsed(blogDir, "", false)
  const blogParsed = allBlogParsed.filter((p) => !p.post.path.includes("telegram"))
  const telegramParsed = await scanDirectoryParsed(telegramDir, "", true)

  const blogPosts = blogParsed.map((p) => p.post)
  const telegramPosts = telegramParsed.map((p) => p.post)

  await writeFile(
    join(outputDir, "blog-posts.json"),
    `${JSON.stringify(blogPosts, null, 2)}\n`,
  )

  await writeFile(
    join(outputDir, "telegram-posts.json"),
    `${JSON.stringify(telegramPosts, null, 2)}\n`,
  )

  console.log(`✅ Generated ${blogPosts.length} blog posts metadata`)
  console.log(`✅ Generated ${telegramPosts.length} telegram posts metadata\n`)

  return {
    blogParsed,
    telegramParsed,
  }
}

async function generateDocfindData(
  blogParsed: ParsedPost[],
  telegramParsed: ParsedPost[],
): Promise<void> {
  console.log("🔄️ Generating docfind indexes...\n")

  const docfindDir = join(process.cwd(), "docfind")

  await mkdir(docfindDir, { recursive: true })

  const blogDocfind: DocfindSchema[] = blogParsed.map(({
    post, markdownContent,
  }) => ({
    title: post.title,
    category: "blog",
    href: post.link,
    body: cleanupMarkdown(markdownContent, false),
    ...(post.tags?.length
      ? { keywords: post.tags }
      : {}),
  }))

  const telegramDocfind: DocfindSchema[] = telegramParsed.map(({
    post, markdownContent,
  }) => ({
    title: post.title,
    category: "telegram",
    href: post.link,
    body: cleanupMarkdown(markdownContent, false),
    ...(post.tags?.length
      ? { keywords: post.tags }
      : {}),
  }))

  await writeFile(
    join(docfindDir, "blog.json"),
    `${JSON.stringify(blogDocfind, null, 2)}\n`,
  )

  await writeFile(
    join(docfindDir, "telegram.json"),
    `${JSON.stringify(telegramDocfind, null, 2)}\n`,
  )

  console.log(`✅ Generated docfind/blog.json (${blogDocfind.length} docs)`)
  console.log(`✅ Generated docfind/telegram.json (${telegramDocfind.length} docs)\n`)
}

async function generatePagefindIndex(
  blogParsed: ParsedPost[],
  telegramParsed: ParsedPost[],
  outputPath: string,
): Promise<void> {
  const { index } = await createIndex()

  const records = [
    ...blogParsed.map((post) => ({
      post,
      origin: "blog",
    })),
    ...telegramParsed.map((post) => ({
      post,
      origin: "telegram",
    })),
  ].map((record) => {
    const content = cleanupMarkdown(record.post.markdownContent, false)
    const words = content.match(/\S+/g)?.length ?? 0

    return {
      post: record.post,
      origin: record.origin,
      content,
      words,
    }
  })

  const indexStart = performance.now()
  const results = await Promise.all(records.map((record) => {
    return index?.addCustomRecord({
      url: record.post.post.link,
      content: record.content,
      language: "en-us",
      meta: record.post.pagefindMeta,
      filters: {
        tags: record.post.pagefindTags,
        origin: [record.origin],
      },
    })
  }))
  const indexDuration = performance.now() - indexStart

  const errors = results.flatMap((result) => result?.errors ?? [])

  if (errors.length > 0) {
    console.error("❌ Pagefind indexing errors :", errors)
  }

  const filesResult = await index?.getFiles()
  const files = filesResult?.files ?? []
  const bundleSize = files.reduce((sum, file) => sum + file.content.length, 0)

  const writeResult = await index?.writeFiles({ outputPath })

  if (writeResult?.errors?.length) {
    console.error("❌ Pagefind write errors :", writeResult.errors)
  }

  console.log("📊 Pagefind stats (blog + telegram) :")
  console.log(`  📖 ${records.length} records`)
  console.log(`  📦 ${files.length} bundle files (${bundleSize} bytes)`)
  console.log(`  ⏱️  ${indexDuration.toFixed(2)}ms to index`)
  console.log("")

  await index?.deleteIndex()
}

async function generatePagefindData(
  blogParsed: ParsedPost[],
  telegramParsed: ParsedPost[],
): Promise<void> {
  console.log("🔄️ Generating Pagefind index...\n")

  await generatePagefindIndex(
    blogParsed,
    telegramParsed,
    join(process.cwd(), "public", "pagefind"),
  )
  await closePagefind()

  console.log("✅ Generated Pagefind index for blog + telegram\n")
}

try {
  const {
    blogParsed,
    telegramParsed,
  } = await generateBlogData()

  await generateDocfindData(blogParsed, telegramParsed)
  await generatePagefindData(blogParsed, telegramParsed)
} catch (e) {
  console.error("❌ Error generating blog data :", e)
  process.exitCode = 1
}
