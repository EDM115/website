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
      const t = tokens[i]

      if (!t) {
        continue
      }

      if (t.type === "html_inline" || t.type === "html_block") {
        const original = t.content
        const updated = addControlsToVideoTags(original)

        if (updated !== original) {
          t.content = updated
        }
      }

      if (t.type === "inline" && Array.isArray(t.children)) {
        for (let j = 0; j < t.children.length; j++) {
          const c = t.children[j]

          if (!c) {
            continue
          }

          if (c.type === "html_inline" || c.type === "html_block") {
            const original = c.content
            const updated = addControlsToVideoTags(original)

            if (updated !== original) {
              c.content = updated
            }
          }
        }
      }
    }
  })
}

export default videoControls
