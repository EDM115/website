export function cleanMarkdown(raw: string, repoName: string, branch: string): string {
  let content = raw

  const extensionlessFiles = new Set([
    "LICENSE",
    "LICENCE",
    "COPYING",
    "NOTICE",
    "AUTHORS",
    "CONTRIBUTORS",
    "Dockerfile",
  ])

  const isFilePath = (path: string) => {
    const cleanPath = path.split(/[?#]/, 1)[0]?.replace(/\/+$/, "") ?? ""
    const basename = cleanPath.split("/")
      .pop() ?? ""

    return (/\.[^/]+$/).test(basename) || extensionlessFiles.has(basename)
  }

  // convert image markdown links (skip external URLs)
  content = content.replace(
    /!\[([^\]]*)\]\(\s*(?:\.\/|\/)?(?!https?:\/\/|#)([^)]+)\)/g,
    `![$1](https://raw.githubusercontent.com/${repoName}/${branch}/$2)`,
  )

  // convert inline HTML <img> tags
  content = content.replace(
    /<img\s+([^>]*?)src="(?:\.\/|\/)?(?!https?:\/\/|#)([^"]+)"([^>]*?)>/gi,
    (_, preAttrs, path, postAttrs) => ` <img ${preAttrs}src="https://raw.githubusercontent.com/${repoName}/${branch}/${path}"${postAttrs}> `,
  )

  // convert markdown links (exclude images and external URLs)
  content = content.replace(
    /(?<!!)\[([^\]]+)\]\(\s*(?:\.\/|\/)?(?!https?:\/\/|#)([^)]+)\)/g,
    (_full, text, path) => {
      const type = isFilePath(path)
        ? "blob"
        : "tree"

      return `[${text}](https://github.com/${repoName}/${type}/${branch}/${path})`
    },
  )

  // clean internal anchor links
  content = content.replace(
    /\[([^\]]+)\]\(\s*#([^)]+)\)/g,
    (_full, text, anchor) => {
      const cleanAnchor = anchor.replace(/-+$/, "")

      return `[${text}](#${cleanAnchor})`
    },
  )

  return content
}
