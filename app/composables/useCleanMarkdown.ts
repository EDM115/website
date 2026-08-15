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

  const githubUrl = (path: string) => {
    const type = isFilePath(path)
      ? "blob"
      : "tree"

    return `https://github.com/${repoName}/${type}/${branch}/${path}`
  }

  // linked images / badges: [![alt](image)](target)
  content = content.replace(
    /\[(!\[[^\]]*\]\([^)]+\))\]\(\s*(?:\.\/|\/)?(?!https?:\/\/|#)([^)]+)\)/g,
    (_full, image, path) => `[${image}](${githubUrl(path)})`,
  )

  // standalone image markdown links
  content = content.replace(
    /!\[([^\]]*)\]\(\s*(?:\.\/|\/)?(?!https?:\/\/|#)([^)]+)\)/g,
    `![$1](https://raw.githubusercontent.com/${repoName}/${branch}/$2)`,
  )

  // inline HTML <img> tags
  content = content.replace(
    /<img\s+([^>]*?)src="(?:\.\/|\/)?(?!https?:\/\/|#)([^"]+)"([^>]*?)>/gi,
    (_, preAttrs, path, postAttrs) => ` <img ${preAttrs}src="https://raw.githubusercontent.com/${repoName}/${branch}/${path}"${postAttrs}> `,
  )

  // normal markdown links
  content = content.replace(
    /(?<!!)\[([^\]]+)\]\(\s*(?:\.\/|\/)?(?!https?:\/\/|#)([^)]+)\)/g,
    (_full, text, path) => `[${text}](${githubUrl(path)})`,
  )

  // internal anchor links
  content = content.replace(
    /\[([^\]]+)\]\(\s*#([^)]+)\)/g,
    (_full, text, anchor) => {
      const cleanAnchor = anchor.replace(/-+$/, "")

      return `[${text}](#${cleanAnchor})`
    },
  )

  return content
}
