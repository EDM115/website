import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"

export interface BlogPostMeta {
  id: string
  title: string
  description: string
  summary?: string
  date?: string
  publishedTime?: string
  tags?: string[]
  lang?: string
  path: string
  link: string
  excerpt: string
  isTelegram: boolean
}

function extractFrontmatter(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { frontmatter: {}, content }
  }
  
  const frontmatterText = match[1] || ""
  const remainingContent = content.slice(match[0].length)
  
  const frontmatter: Record<string, any> = {}
  const lines = frontmatterText.split("\n")
  
  let currentKey = ""
  let currentValue: any = null
  let inArray = false
  
  for (const line of lines) {
    if (line.trim().startsWith("- ")) {
      // Array item
      if (inArray && currentValue && Array.isArray(currentValue)) {
        const itemMatch = line.match(/^\s*-\s*name:\s*(.*)/)
        if (itemMatch) {
          const item: Record<string, string> = { name: itemMatch[1]?.trim() || "" }
          currentValue.push(item)
        }
      }
    }
    else if (line.includes(":")) {
      const colonIndex = line.indexOf(":")
      const key = line.slice(0, colonIndex).trim()
      const value = line.slice(colonIndex + 1).trim()
      
      if (value === "") {
        // Start of array or object
        currentKey = key
        currentValue = []
        frontmatter[key] = currentValue
        inArray = true
      }
      else {
        frontmatter[key] = value
        inArray = false
      }
    }
    else if (inArray && line.trim().startsWith("content:")) {
      // Meta content
      const value = line.split("content:")[1]?.trim() || ""
      if (currentValue && Array.isArray(currentValue) && currentValue.length > 0) {
        const lastItem = currentValue[currentValue.length - 1]
        if (lastItem) {
          lastItem.content = value
        }
      }
    }
  }
  
  return { frontmatter, content: remainingContent }
}

function extractTitle(content: string): string {
  const h1Match = content.match(/^#\s+(.+)$/m)
  return h1Match?.[1] || "Untitled"
}

function extractExcerpt(content: string, maxLength = 200): string {
  // Remove markdown formatting
  let text = content
    .replace(/^---[\s\S]*?---/, "") // Remove frontmatter
    .replace(/^#+\s+/gm, "") // Remove headers
    .replace(/\*\*(.+?)\*\*/g, "$1") // Remove bold
    .replace(/\*(.+?)\*/g, "$1") // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, "$1") // Remove links
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`(.+?)`/g, "$1") // Remove inline code
    .replace(/:\w+:/g, "") // Remove emoji codes
    .trim()
  
  // Get first paragraph or first N characters
  const firstParagraph = text.split("\n\n")[0] || ""
  if (firstParagraph.length <= maxLength) {
    return firstParagraph
  }
  
  return firstParagraph.slice(0, maxLength) + "..."
}

async function parseBlogPost(filePath: string, relativePath: string, isTelegram: boolean): Promise<BlogPostMeta> {
  const content = await readFile(filePath, "utf-8")
  const { frontmatter, content: markdownContent } = extractFrontmatter(content)
  
  const title = frontmatter.title || extractTitle(markdownContent)
  const summary = frontmatter.meta?.find((m: any) => m.name === "summary")?.content || ""
  const description = frontmatter.meta?.find((m: any) => m.name === "description")?.content || ""
  const date = frontmatter.meta?.find((m: any) => m.name === "date")?.content || 
               frontmatter.meta?.find((m: any) => m.name === "article:published_time")?.content || ""
  
  // Extract date from filename if not in frontmatter
  let postDate = date
  if (!postDate) {
    const filenameDateMatch = relativePath.match(/(\d{4})\/(\d{2})\/(\d{2})/)
    if (filenameDateMatch) {
      postDate = `${filenameDateMatch[1]}-${filenameDateMatch[2]}-${filenameDateMatch[3]}`
    }
    else {
      const telegramDateMatch = relativePath.match(/(\d{2})-(\d{2})/)
      if (telegramDateMatch) {
        const yearMatch = relativePath.match(/(\d{4})/)
        if (yearMatch) {
          postDate = `${yearMatch[1]}-${telegramDateMatch[1]}-${telegramDateMatch[2]}`
        }
      }
    }
  }
  
  const excerpt = summary || description || extractExcerpt(markdownContent)
  
  // Generate link from relative path
  let link = ""
  if (isTelegram) {
    link = `/telegram-posts/${relativePath.replace(/\.md$/, "")}`
  }
  else {
    link = `/blog/${relativePath.replace(/\.md$/, "")}`
  }
  
  return {
    id: relativePath.replace(/\.md$/, "").replace(/\//g, "-"),
    title: title.replace(/ - EDM115 blog$/i, "").replace(/^EDM115 Telegram blog$/i, "Telegram Post"),
    description,
    summary,
    date: postDate,
    publishedTime: date,
    tags: frontmatter.tags || [],
    lang: frontmatter.lang || "en",
    path: relativePath,
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
      }
      else if (entry.isFile() && entry.name.endsWith(".md")) {
        const fullPath = join(currentDir, entry.name)
        const post = await parseBlogPost(fullPath, entryPath, isTelegram)
        posts.push(post)
      }
    }
  }
  catch (error) {
    console.error(`Error scanning directory ${currentDir}:`, error)
  }
  
  return posts
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  const blogDir = join(process.cwd(), "app", "components", "blog")
  
  // Get regular blog posts (exclude telegram folder)
  const blogPosts = await scanDirectory(blogDir, "", false)
  const regularPosts = blogPosts.filter(post => !post.path.includes("telegram"))
  
  return regularPosts
}

export async function getAllTelegramPosts(): Promise<BlogPostMeta[]> {
  const telegramDir = join(process.cwd(), "app", "components", "blog", "telegram")
  
  const posts = await scanDirectory(telegramDir, "", true)
  return posts
}
