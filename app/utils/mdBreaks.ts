import type { PluginSimple } from "markdown-exit"

const brOnEmptyLines: PluginSimple = (md) => {
  md.core.ruler.after("inline", "br-on-empty-lines", (state) => {
    const tokens = state.tokens

    for (let i = 0; i < tokens.length; i++) {
      const nextOpen = tokens[i]

      if (nextOpen?.type !== "paragraph_open") {
        continue
      }

      // pattern we want just before `nextOpen` :
      // [paragraph_open, inline, paragraph_close]
      const prevClose = tokens[i - 1]
      const prevInline = tokens[i - 2]
      const prevOpen = tokens[i - 3]

      if (
        !prevClose || !prevInline || !prevOpen
        || prevClose.type !== "paragraph_close"
        || prevInline.type !== "inline"
        || prevOpen.type !== "paragraph_open"
      ) {
        // previous block wasn't a paragraph, skip
        continue
      }

      // Both open tokens usually have `map: [startLine, endLineExclusive]`
      // The gap between them is the number of empty lines in between
      const prevMap = prevOpen.map
      const nextMap = nextOpen.map

      if (!prevMap || !nextMap) {
        continue
      }

      // 0 => no blank line, 1 => one blank, ...
      const emptyLines = nextMap[0] - prevMap[1]

      if (emptyLines <= 0) {
        continue
      }

      // Rule : add 1 <br> for the break itself, plus one per extra empty line
      const brCount = emptyLines + 1

      const children = prevInline.children || (prevInline.children = [])

      for (let k = 0; k < brCount; k++) {
        // create a hardbreak token (<br>)
        const br = new state.Token("hardbreak", "br", 0)

        children.push(br)
      }
    }
  })
}

export default brOnEmptyLines
