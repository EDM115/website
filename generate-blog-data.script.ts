import {
  readdir,
  readFile,
  writeFile,
} from "node:fs/promises"
import { join } from "node:path"

import type {
  BlogPostMeta,
  Frontmatter,
  TelegramFileInfo,
} from "~/types"

function extractFrontmatter(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return {
      frontmatter: {} as Frontmatter, content,
    }
  }

  const frontmatterText = match[1] || ""
  const remainingContent = content.slice(match[0].length)

  const frontmatter: Record<string, any> = {}
  // Using Record<string, any> to allow dynamic YAML keys
  const lines = frontmatterText.split("\n")

  let currentKey = ""
  let currentArray: any[] = []
  let inArray = false
  let inArrayItem = false
  let currentItem: Record<string, string> = {}

  // Note: Using custom parser to avoid additional dependencies. 
  // For production, consider using a library like 'gray-matter' or 'front-matter'
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] || ""
    const trimmed = line.trim()

    // Skip empty lines
    if (!trimmed) {
      continue
    }

    // Check for array item start
    if (trimmed.startsWith("- ")) {
      if (inArray) {
        // Save previous item if exists
        if (Object.keys(currentItem).length > 0) {
          currentArray.push({ ...currentItem })
          currentItem = {}
        }

        // Check if it's a simple array item or object item
        const itemContent = trimmed.slice(2)
          .trim()

        if (itemContent.includes(":")) {
          // Object item
          const colonIndex = itemContent.indexOf(":")
          const key = itemContent.slice(0, colonIndex)
            .trim()
          const value = itemContent.slice(colonIndex + 1)
            .trim()

          currentItem[key] = value
          inArrayItem = true
        } else {
          // Simple array item
          currentArray.push(itemContent)
        }
      }
    } else if (inArrayItem && line.startsWith("    ")) {
      // Check for nested property in array item
      const propLine = trimmed

      if (propLine.includes(":")) {
        const colonIndex = propLine.indexOf(":")
        const key = propLine.slice(0, colonIndex)
          .trim()
        const value = propLine.slice(colonIndex + 1)
          .trim()

        currentItem[key] = value
      }
    } else if (!line.startsWith(" ") && line.includes(":")) {
      // Check for new top-level key
      // Save previous array if exists
      if (inArray && currentKey) {
        if (Object.keys(currentItem).length > 0) {
          currentArray.push({ ...currentItem })
          currentItem = {}
        }

        frontmatter[currentKey] = currentArray
        currentArray = []
        inArray = false
        inArrayItem = false
      }

      const colonIndex = line.indexOf(":")
      const key = line.slice(0, colonIndex)
        .trim()
      const value = line.slice(colonIndex + 1)
        .trim()

      if (value === "") {
        // Start of array or object
        currentKey = key
        currentArray = []
        inArray = true
      } else {
        frontmatter[key] = value
      }
    }
  }

  // Save last array if exists
  if (inArray && currentKey) {
    if (Object.keys(currentItem).length > 0) {
      currentArray.push({ ...currentItem })
    }

    frontmatter[currentKey] = currentArray
  }

  return {
    frontmatter: frontmatter as Frontmatter, content: remainingContent,
  }
}

function extractTitle(content: string): string {
  const h1Match = content.match(/^#\s+(.+)$/m)

  return h1Match?.[1] || "Untitled"
}

function extractExcerpt(content: string, maxLength = 200, isTelegram = false): string {
  // Remove markdown formatting
  let text = content
    // Remove frontmatter
    .replace(/^---[\s\S]*?---/, "")
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

  if (firstParagraph.length <= maxLength) {
    return firstParagraph
  }

  return firstParagraph.slice(0, maxLength) + "..."
}

function parsePublishedTime(publishedTime: string): {
  date: string; link: string;
} {
  // Parse ISO 8601 date format : 2024-08-20T12:00:00Z
  const match = publishedTime.match(/^(\d{4})-(\d{2})-(\d{2})/)

  if (match) {
    const [ , year, month, day ] = match

    return {
      date: `${year}-${month}-${day}`,
      link: `/${year}/${month}/${day}`,
    }
  }

  return {
    date: "", link: "",
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
  const {
    frontmatter, content: markdownContent,
  } = extractFrontmatter(content)

  // Normalize path for cross-platform compatibility
  const normalizedRelativePath = normalizePath(relativePath)
  const telegramFileInfo = isTelegram
    ? parseTelegramFilePath(normalizedRelativePath)
    : null

  // Extract metadata
  const titleFromFrontmatter = frontmatter.title || extractTitle(markdownContent)
  const publishedTime = frontmatter.meta?.find((metaItem) => metaItem.name === "article:published_time")?.content || ""
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

  const excerpt = summary || extractExcerpt(markdownContent, 200, isTelegram)

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

async function scanDirectory(baseDir: string, subDir = "", isTelegram = false): Promise<BlogPostMeta[]> {
  const posts: BlogPostMeta[] = []
  const currentDir = join(baseDir, subDir)

  try {
    const entries = await readdir(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const entryPath = join(subDir, entry.name)

      if (entry.isDirectory()) {
        const subPosts = await scanDirectory(baseDir, entryPath, isTelegram)

        posts.push(...subPosts)
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const fullPath = join(currentDir, entry.name)
        const post = await parseBlogPost(fullPath, entryPath, isTelegram)

        posts.push(post)
      }
    }
  } catch (error) {
    console.error(`❌ Error scanning directory ${currentDir} :`, error)
  }

  return posts
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
