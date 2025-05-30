const blogPosts = import.meta.glob("../views/blog/**/*.vue")

export function generateBlogChildren() {
  return Object.entries(blogPosts).map(([ filePath, component ]) => {
    const relative = filePath
      .replace("../views/blog/", "")
      .replace("View.vue", "")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
      .replace(/([a-z\d])([A-Z])/g, "$1-$2")
      .replace(/([A-Za-z])(\d+)/g, "$1-$2")
      .toLowerCase()
      .replace(/\/-/, "/")
      .replace(/\s+/g, "-")

    return {
      path: relative,
      component,
    }
  })
}
