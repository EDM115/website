import type { PluginSimple } from "markdown-exit"

function addControlsToVideoTags(input: string): string {
  return input.replace(/<video\b[^>]*>/gi, (openTag) => {
    if ((/\bcontrols\b/i).test(openTag)) {
      return openTag
    }

    return openTag.replace(/>\s*$/i, (end) => ` controls${end}`)
  })
}

const videoControls: PluginSimple = (md) => {
  md.core.ruler.after("inline", "video-controls-attr", (state) => {
    const tokens = state.tokens

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (!token) {
        continue
      }

      if (token.type === "html_inline" || token.type === "html_block") {
        const original = token.content
        const updated = addControlsToVideoTags(original)

        if (updated !== original) {
          token.content = updated
        }
      }

      if (token.type === "inline" && Array.isArray(token.children)) {
        for (let j = 0; j < token.children.length; j++) {
          const content = token.children[j]

          if (!content) {
            continue
          }

          if (content.type === "html_inline" || content.type === "html_block") {
            const original = content.content
            const updated = addControlsToVideoTags(original)

            if (updated !== original) {
              content.content = updated
            }
          }
        }
      }
    }
  })
}

export default videoControls
