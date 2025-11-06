import { readdir, readFile, writeFile, mkdir } from "node:fs/promises"
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
  let currentArray: any[] = []
  let inArray = false
  let inArrayItem = false
  let currentItem: any = {}
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] || ""
    const trimmed = line.trim()
    
    // Skip empty lines
    if (!trimmed) {continue}
    
    // Check for array item start
    if (trimmed.startsWith("- ")) {
      if (inArray) {
        // Save previous item if exists
        if (Object.keys(currentItem).length > 0) {
          currentArray.push({ ...currentItem })
          currentItem = {}
        }
        
        // Check if it's a simple array item or object item
        const itemContent = trimmed.slice(2).trim()
        if (itemContent.includes(":")) {
          // Object item
          const colonIndex = itemContent.indexOf(":")
          const key = itemContent.slice(0, colonIndex).trim()
          const value = itemContent.slice(colonIndex + 1).trim()
          currentItem[key] = value
          inArrayItem = true
        }
        else {
          // Simple array item
          currentArray.push(itemContent)
        }
      }
    }
    // Check for nested property in array item
    else if (inArrayItem && line.startsWith("    ")) {
      const propLine = trimmed
      if (propLine.includes(":")) {
        const colonIndex = propLine.indexOf(":")
        const key = propLine.slice(0, colonIndex).trim()
        const value = propLine.slice(colonIndex + 1).trim()
        currentItem[key] = value
      }
    }
    // Check for new top-level key
    else if (!line.startsWith(" ") && line.includes(":")) {
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
      const key = line.slice(0, colonIndex).trim()
      const value = line.slice(colonIndex + 1).trim()
      
      if (value === "") {
        // Start of array or object
        currentKey = key
        currentArray = []
        inArray = true
      }
      else {
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

async function generateBlogData() {
  console.log("Generating blog metadata...")
  
  const blogDir = join(process.cwd(), "app", "components", "blog")
  const telegramDir = join(process.cwd(), "app", "components", "blog", "telegram")
  const outputDir = join(process.cwd(), "public", "api")
  
  // Create output directory
  await mkdir(outputDir, { recursive: true })
  
  // Get regular blog posts (exclude telegram folder)
  const allBlogPosts = await scanDirectory(blogDir, "", false)
  const blogPosts = allBlogPosts.filter(post => !post.path.includes("telegram"))
  
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
  
  // Write to JSON files
  await writeFile(
    join(outputDir, "blog-posts.json"),
    JSON.stringify(blogPosts, null, 2),
  )
  
  await writeFile(
    join(outputDir, "telegram-posts.json"),
    JSON.stringify(telegramPosts, null, 2),
  )
  
  console.log(`✓ Generated ${blogPosts.length} blog posts metadata`)
  console.log(`✓ Generated ${telegramPosts.length} telegram posts metadata`)
}

generateBlogData().catch(console.error)
