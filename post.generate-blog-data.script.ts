import {
  access,
  mkdir,
  readdir,
  readFile,
  rename,
  rm,
  writeFile,
} from "node:fs/promises"
import {
  dirname,
  join,
} from "node:path"

async function ensureDir(dirPath: string) {
  await mkdir(dirPath, { recursive: true })
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path)

    return true
  } catch {
    return false
  }
}

async function moveAndPatchJs(
  srcPath: string,
  destPath: string,
  wasmReplacement: string,
) {
  const srcExists = await pathExists(srcPath)

  if (!srcExists) {
    throw new Error(`❌ Missing source JS : ${srcPath}`)
  }

  const js = await readFile(srcPath, "utf-8")
  const patched = js.split("docfind_bg.wasm")
    .join(wasmReplacement)

  await ensureDir(dirname(destPath))
  await writeFile(destPath, patched, "utf-8")
  await rm(srcPath, { force: true })
}

async function moveFile(srcPath: string, destPath: string) {
  await ensureDir(dirname(destPath))
  await rm(destPath, {
    recursive: true, force: true,
  })
  await rename(srcPath, destPath)
}

function shouldMovePagefindAsset(fileName: string): boolean {
  if (fileName.endsWith(".css")) {
    return false
  }

  if (fileName.endsWith("-ui.js") || fileName.endsWith("-highlight.js")) {
    return false
  }

  return true
}

async function movePagefindBundle(srcDir: string, destDir: string) {
  if (!await pathExists(srcDir)) {
    return
  }

  const entries = await readdir(srcDir)

  await Promise.all(entries.map(async (entry) => {
    if (!shouldMovePagefindAsset(entry)) {
      return
    }

    await moveFile(join(srcDir, entry), join(destDir, entry))
  }))
}

async function emptyDirectory(dirPath: string) {
  let entries: string[] = []

  try {
    entries = await readdir(dirPath)
  } catch {
    return
  }

  await Promise.all(entries.map(async (name) => {
    await rm(join(dirPath, name), {
      recursive: true, force: true,
    })
  }))

  await rm(dirPath, {
    recursive: true, force: true,
  })
}

async function main() {
  const cwd = process.cwd()

  const docfindDir = join(cwd, "docfind")
  const docfindBlogDir = join(docfindDir, "blog")
  const docfindTelegramDir = join(docfindDir, "telegram")

  const pagefindDir = join(cwd, "pagefind")
  const pagefindBlogDir = join(pagefindDir, "blog")
  const pagefindTelegramDir = join(pagefindDir, "telegram")

  const targetDir = join(cwd, "app", "components", "home", "blog")
  const pagefindTargetDir = join(targetDir, "pagefind")

  await moveAndPatchJs(
    join(docfindBlogDir, "docfind.js"),
    join(targetDir, "docfind_blog.js"),
    "docfind_blog.wasm",
  )

  await moveAndPatchJs(
    join(docfindTelegramDir, "docfind.js"),
    join(targetDir, "docfind_telegram.js"),
    "docfind_telegram.wasm",
  )

  await moveFile(
    join(docfindBlogDir, "docfind_bg.wasm"),
    join(targetDir, "docfind_blog.wasm"),
  )

  await moveFile(
    join(docfindTelegramDir, "docfind_bg.wasm"),
    join(targetDir, "docfind_telegram.wasm"),
  )

  await movePagefindBundle(
    pagefindBlogDir,
    join(pagefindTargetDir, "blog"),
  )

  await movePagefindBundle(
    pagefindTelegramDir,
    join(pagefindTargetDir, "telegram"),
  )

  await emptyDirectory(docfindDir)
  await emptyDirectory(pagefindDir)

  console.log("\n✅ Moved + patched docfind assets, moved Pagefind bundles, and cleared docfind/pagefind contents")
}

try {
  await main()
} catch (e) {
  console.error("\n❌ docfind/pagefind mover failed :", e)
  process.exitCode = 1
}
