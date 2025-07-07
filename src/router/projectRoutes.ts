const projects = import.meta.glob("../views/projects/**/*.vue")

export function generateProjectChildren() {
  return Object.entries(projects).map(([ filePath, component ]) => {
    const relative = filePath
      .replace("../views/projects/", "")
      .replace("View.vue", "")
      .replace(/edm115/gi, "EDM115")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
      .replace(/([a-z\d])([A-Z])/g, "$1-$2")
      .replace(/([A-Za-z])(\d+)/g, "$1-$2")
      .replace(/EDM-115/g, "EDM115")
      .toLowerCase()
      .replace(/\/-/, "/")
      .replace(/\s+/g, "-")

    return {
      path: relative,
      component,
    }
  })
}
