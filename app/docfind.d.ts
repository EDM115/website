import type { DocfindSchema } from "./types"

declare module "~/components/home/blog/docfind_blog.js" {
  const search: (term: string, limit?: number) => Omit<DocfindSchema, "keywords">[] | Promise<Omit<DocfindSchema, "keywords">[]>
  export const init: () => Promise<void>
  export default search
}

declare module "~/components/home/blog/docfind_telegram.js" {
  const search: (term: string, limit?: number) => Omit<DocfindSchema, "keywords">[] | Promise<Omit<DocfindSchema, "keywords">[]>
  export const init: () => Promise<void>
  export default search
}
