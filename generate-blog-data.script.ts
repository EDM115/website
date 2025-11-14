import {
  readdir,
  readFile,
  writeFile,
} from "node:fs/promises"
import { join } from "node:path"

import grayMatter from "gray-matter"

import type {
  BlogPostMeta,
  Frontmatter,
  FileInfo,
} from "./app/types"

function extractExcerpt(content: string, maxLength = 200): string {
  // Remove markdown formatting
  const text = content
    // Remove backslash on escaped markdown characters
    .replace(/\\([\\`*_{}[\]()#+\-.!])/g, "$1")
    // Remove headers
    .replace(/^#+\s+/gm, "")
    // Remove images
    .replace(/!\[.*?\]\(.*?\)/g, "")
    // Remove bold
    .replace(/\*\*(.+?)\*\*/g, "$1")
    // Remove italic
    .replace(/\*(.+?)\*/g, "$1")
    // Remove strikethrough
    .replace(/~~(.+?)~~/g, "$1")
    // Remove spoilers (and their content)
    .replace(/!!(.+?)!!/g, "")
    // Remove links
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")
    // Remove inline code
    .replace(/`(.+?)`/g, "$1")
    // Remove emoji codes
    .replace(/:\w+:/g, "")
    // Remove html tags
    .replace(/<\/?[^>]+(>|$)/g, "")
    // Replace multiple newlines with a single newline
    .replace(/\n{2,}/g, "\n")
    // Replace newlines with spaces
    .replace(/\n/g, " ")
    // Replace multiple spaces with a single space
    .replace(/ {2,}/g, " ")
    // Trim whitespace
    .trim()

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

  const match = publishedTime.toISOString()
    .match(/^(\d{4})-(\d{2})-(\d{2})/)

  if (!match) {
    return {
      date: "", link: "",
    }
  }

  const [ , year, month, day ] = match

  return {
    date: `${year}-${month}-${day}`,
    link: `/${year}/${month}/${day}`,
  }
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
): Promise<{
  post: BlogPostMeta; publishedTime: Date;
}> {
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

  const post = {
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
    publishedTime: publishedTime instanceof Date
      ? publishedTime
      : new Date(0),
  }
}

async function scanDirectoryWithTime(
  baseDir: string,
  subDir = "",
  isTelegram = false,
): Promise<{
  post: BlogPostMeta; publishedTime: Date;
}[]> {
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
        const post = await parseBlogPost(fullPath, entryPath, isTelegram)

        return [post]
      }

      return []
    }))

    return results.flat()
  } catch (error) {
    console.error(`❌ Error scanning directory ${currentDir} :`, error)

    return []
  }
}

async function scanDirectory(
  baseDir: string,
  subDir = "",
  isTelegram = false,
): Promise<BlogPostMeta[]> {
  const postsWithTime = await scanDirectoryWithTime(baseDir, subDir, isTelegram)

  // Sort antichronologically by publish time
  postsWithTime.sort((a, b) => b.publishedTime.getTime() - a.publishedTime.getTime())

  return postsWithTime.map(({ post }) => post)
}

async function generateBlogData() {
  console.log("🔄️ Generating blog metadata...\n")

  const blogDir = join(process.cwd(), "app", "components", "blog")
  const telegramDir = join(process.cwd(), "app", "components", "blog", "telegram")
  const outputDir = join(process.cwd(), "app", "assets", "data")

  // Get regular blog posts (exclude telegram folder)
  const allBlogPosts = await scanDirectory(blogDir, "", false)
  const blogPosts = allBlogPosts.filter((post) => !post.path.includes("telegram"))

  // Get telegram posts
  const telegramPosts = await scanDirectory(telegramDir, "", true)

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
}

try {
  await generateBlogData()
} catch (e) {
  console.error("❌ Error generating blog data :", e)
}
