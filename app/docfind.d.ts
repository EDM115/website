import type { DocfindSchema } from "./types"

declare module "~~/public/docfind/docfind_blog.js" {
  const search: (term: string, limit?: number) => Omit<DocfindSchema, "keywords">[] | Promise<Omit<DocfindSchema, "keywords">[]>

  export const init: () => Promise<void>

  export default search
}

declare module "~~/public/docfind/docfind_telegram.js" {
  const search: (term: string, limit?: number) => Omit<DocfindSchema, "keywords">[] | Promise<Omit<DocfindSchema, "keywords">[]>

  export const init: () => Promise<void>

  export default search
}
