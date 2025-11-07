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
  TelegramFileInfo,
} from "./app/types"

function extractTitle(content: string): string {
  const h1Match = content.match(/^#\s+(.+)$/m)

  return h1Match?.[1] || "Untitled"
}

function extractExcerpt(content: string, maxLength = 200): string {
  // Remove markdown formatting
  let text = content
    // Remove headers
    .replace(/^#+\s+/gm, "")
    // Remove images
    .replace(/!\[.*?\]\(.*?\)/g, "")
    // Remove bold
    .replace(/\*\*(.+?)\*\*/g, "$1")
    // Remove italic
    .replace(/\*(.+?)\*/g, "$1")
    // Remove links
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")
    // Remove inline code
    .replace(/`(.+?)`/g, "$1")
    // Remove emoji codes
    .replace(/:\w+:/g, "")
    .trim()

  // Get first paragraph or first N characters
  const firstParagraph = text.split("\n\n")[0] || ""
  let firstNCharacters = text.slice(0, maxLength)

  if (firstNCharacters.length < text.length) {
    firstNCharacters += "..."
  }

  if (firstNCharacters.length <= maxLength) {
    return firstNCharacters
  }

  if (firstParagraph.length <= maxLength) {
    return firstParagraph
  }

  return firstParagraph.length >= firstNCharacters.length
    ? firstParagraph + "..."
    : firstNCharacters
}

function parsePublishedTime(publishedTime: unknown): {
  date: string; link: string;
} {
  let asISO = ""

  if (typeof publishedTime === "string") {
    asISO = publishedTime
  } else if (publishedTime instanceof Date) {
    asISO = publishedTime.toISOString()
  } else if (typeof publishedTime === "number") {
    asISO = new Date(publishedTime)
      .toISOString()
  } else {
    return {
      date: "", link: "",
    }
  }

  const m = asISO.match(/^(\d{4})-(\d{2})-(\d{2})/)

  if (!m) {
    return {
      date: "", link: "",
    }
  }

  const [ , year, month, day ] = m

  return {
    date: `${year}-${month}-${day}`, link: `/${year}/${month}/${day}`,
  }
}


function normalizePath(path: string): string {
  return path.replace(/\\/g, "/")
}

function parseTelegramFilePath(relativePath: string): TelegramFileInfo | null {
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

async function parseBlogPost(filePath: string, relativePath: string, isTelegram: boolean): Promise<BlogPostMeta> {
  const content = await readFile(filePath, "utf-8")
  const frontMatterParsed = grayMatter(content)
  const frontmatter = frontMatterParsed.data as Frontmatter
  const markdownContent = frontMatterParsed.content

  // Normalize path for cross-platform compatibility
  const normalizedRelativePath = normalizePath(relativePath)
  const telegramFileInfo = isTelegram
    ? parseTelegramFilePath(normalizedRelativePath)
    : null

  // Extract metadata
  const titleFromFrontmatter = frontmatter.title || extractTitle(markdownContent)
  const publishedTime = frontmatter.meta?.find((metaItem) => metaItem.name === "article:published_time")?.content
  const summary = frontmatter.meta?.find((metaItem) => metaItem.name === "summary")?.content || ""

  // Extract tags from frontmatter meta or tags field
  let tags: string[] = []

  if (frontmatter.tags) {
    // Handle tags as string (comma-separated) or array
    if (typeof frontmatter.tags === "string") {
      tags = frontmatter.tags.split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    } else if (Array.isArray(frontmatter.tags)) {
      tags = frontmatter.tags
    }
  }

  // Also check meta for tags field
  const metaTags = frontmatter.meta?.find((metaItem) => metaItem.name === "tags")?.content

  if (metaTags && typeof metaTags === "string") {
    const additionalTags = metaTags.split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    tags = [...new Set([ ...tags, ...additionalTags ])]
  }

  // Parse date and link from published time
  const {
    date: parsedDate, link: dateLink,
  } = publishedTime
    ? parsePublishedTime(publishedTime)
    : {
        date: "", link: "",
      }

  let resolvedDate = parsedDate

  if (!resolvedDate && telegramFileInfo) {
    resolvedDate = `${telegramFileInfo.year}-${telegramFileInfo.month}-${telegramFileInfo.day}`
  }

  let link = ""

  if (isTelegram) {
    if (telegramFileInfo) {
      link = `/blog/telegram/${telegramFileInfo.year}/${telegramFileInfo.month}/${telegramFileInfo.day}/${telegramFileInfo.slug}`
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
    if (parsedDate) {
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
  const description = frontmatter.meta?.find((metaItem) => metaItem.name === "description")?.content
  const title = description || titleFromFrontmatter.replace(/ - EDM115 blog$/i, "")
    .replace(/^EDM115 Telegram blog$/i, "Telegram Post")

  const excerpt = summary || extractExcerpt(markdownContent, 200)

  return {
    id: normalizedRelativePath.replace(/\.md$/, "")
      .replace(/\//g, "-"),
    title,
    date: resolvedDate,
    tags,
    path: normalizedRelativePath,
    link,
    excerpt,
    isTelegram,
  }
}

async function scanDirectory(
  baseDir: string,
  subDir = "",
  isTelegram = false,
): Promise<BlogPostMeta[]> {
  const currentDir = join(baseDir, subDir)

  try {
    const entries = await readdir(currentDir, { withFileTypes: true })

    const results = await Promise.all(entries.map(async (entry) => {
      const entryPath = join(subDir, entry.name)

      if (entry.isDirectory()) {
        return await scanDirectory(baseDir, entryPath, isTelegram)
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

  // Sort posts by date (antichronological)
  blogPosts.sort((a, b) => {
    const dateA = a.date || ""
    const dateB = b.date || ""

    return dateB.localeCompare(dateA)
  })

  telegramPosts.sort((a, b) => {
    const dateA = a.date || ""
    const dateB = b.date || ""

    return dateB.localeCompare(dateA)
  })

  await writeFile(
    join(outputDir, "blog-posts.json"),
    JSON.stringify(blogPosts, null, 2),
  )

  await writeFile(
    join(outputDir, "telegram-posts.json"),
    JSON.stringify(telegramPosts, null, 2),
  )

  console.log(`✅ Generated ${blogPosts.length} blog posts metadata`)
  console.log(`✅ Generated ${telegramPosts.length} telegram posts metadata\n`)
}

try {
  await generateBlogData()
} catch (e) {
  console.error("❌ Error generating blog data :", e)
}
