import { getAllBlogPosts } from "../../utils/blogParser"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  const page = Number.parseInt(query.page as string) || 1
  const perPage = Number.parseInt(query.perPage as string) || 10
  const search = query.search as string || ""
  const tag = query.tag as string || ""
  const lang = query.lang as string || ""
  const before = query.before as string || ""
  const after = query.after as string || ""
  const at = query.at as string || ""
  
  let posts = await getAllBlogPosts()
  
  // Sort by date (antichronological)
  posts.sort((a, b) => {
    const dateA = a.date || ""
    const dateB = b.date || ""
    return dateB.localeCompare(dateA)
  })
  
  // Apply filters
  if (search) {
    const searchLower = search.toLowerCase()
    const exactSearch = search.startsWith("\"") && search.endsWith("\"")
    const searchTerm = exactSearch ? search.slice(1, -1).toLowerCase() : searchLower
    
    posts = posts.filter(post => {
      const searchableText = [
        post.title,
        post.excerpt,
        post.description,
        post.summary,
      ].join(" ").toLowerCase()
      
      if (exactSearch) {
        return searchableText.includes(searchTerm)
      }
      
      // Fuzzy search: split into words and check each
      const words = searchTerm.split(/\s+/).filter(w => w.length > 2) // Omit basic words (< 3 chars)
      return words.some(word => searchableText.includes(word))
    })
  }
  
  if (tag) {
    posts = posts.filter(post => post.tags?.includes(tag))
  }
  
  if (lang) {
    posts = posts.filter(post => post.lang === lang)
  }
  
  if (at) {
    posts = posts.filter(post => post.date?.startsWith(at))
  }
  
  if (before) {
    posts = posts.filter(post => post.date && post.date < before)
  }
  
  if (after) {
    posts = posts.filter(post => post.date && post.date > after)
  }
  
  // Pagination
  const total = posts.length
  const totalPages = Math.ceil(total / perPage)
  const start = (page - 1) * perPage
  const end = start + perPage
  
  const paginatedPosts = posts.slice(start, end)
  
  return {
    posts: paginatedPosts,
    pagination: {
      page,
      perPage,
      total,
      totalPages,
    },
    filters: {
      search,
      tag,
      lang,
      before,
      after,
      at,
    },
  }
})
