import type {
  PluginWithOptions,
  StateInline,
  Token,
} from "markdown-exit"

type VideoAttributeValue = boolean | number | string | null | undefined

type VideoAttributeRecord = Record<string, VideoAttributeValue>

export interface MarkdownVideoTagOptions {
  /**
   * Add a `controls` attribute to generated `<video>` tags.
   *
   * @default true
   */
  controls?: boolean;

  /**
   * Add a `preload` attribute. Set to `false` to omit it.
   *
   * @default "metadata"
   */
  preload?: "auto" | "metadata" | "none" | false;

  /**
   * Add an `autoplay` attribute.
   *
   * @default false
   */
  autoplay?: boolean;

  /**
   * Add a `loop` attribute.
   *
   * @default false
   */
  loop?: boolean;

  /**
   * Add a `muted` attribute.
   *
   * @default false
   */
  muted?: boolean;

  /**
   * Add a `playsinline` attribute.
   *
   * @default true
   */
  playsInline?: boolean;

  /**
   * Add a `poster` attribute.
   */
  poster?: string;

  /**
   * Extra class names for generated `<video>` tags.
   */
  className?: string;

  /**
   * Extra attributes for generated `<video>` tags.
   */
  attrs?: VideoAttributeRecord;

  /**
   * Copy the video label into `aria-label` when the video has no explicit aria label.
   *
   * @default true
   */
  labelAsAriaLabel?: boolean;

  /**
   * Validate the parsed video source before emitting a token.
   * Defaults to the markdown-exit link validator.
   */
  validateSrc?: (src: string) => boolean;
}

const questionMarkCode = "?".charCodeAt(0)
const openBracketCode = "[".charCodeAt(0)
const openParenCode = "(".charCodeAt(0)
const closeParenCode = ")".charCodeAt(0)

function isMarkdownSpace(code: number) {
  return code === 0x09
    || code === 0x0A
    || code === 0x0B
    || code === 0x0C
    || code === 0x0D
    || code === 0x20
}

function skipSpaces(src: string, pos: number, max: number) {
  while (pos < max && isMarkdownSpace(src.charCodeAt(pos))) {
    pos++
  }

  return pos
}

function parseVideoDestination(state: StateInline, src: string, pos: number, max: number) {
  const md = state.md
  const result = md.helpers.parseLinkDestination(src, pos, max)

  if (!result.ok) {
    return null
  }

  return {
    pos: result.pos,
    src: result.str,
  }
}

function parseVideoTitle(state: StateInline, src: string, pos: number, max: number) {
  const md = state.md
  const result = md.helpers.parseLinkTitle(src, pos, max)

  if (!result.ok) {
    return null
  }

  return {
    pos: result.pos,
    title: result.str,
  }
}

function parseVideoTag(state: StateInline, silent: boolean) {
  const start = state.pos
  const max = state.posMax
  const src = state.src

  if (
    src.charCodeAt(start) !== questionMarkCode
    || start + 1 >= max
    || src.charCodeAt(start + 1) !== openBracketCode
  ) {
    return false
  }

  const labelEnd = state.md.helpers.parseLinkLabel(state, start + 1, false)

  if (labelEnd < 0) {
    return false
  }

  let pos = labelEnd + 1

  if (pos >= max || src.charCodeAt(pos) !== openParenCode) {
    return false
  }

  pos = skipSpaces(src, pos + 1, max)

  const destination = parseVideoDestination(state, src, pos, max)

  if (!destination) {
    return false
  }

  pos = destination.pos

  const afterDestination = skipSpaces(src, pos, max)
  let title = ""

  if (afterDestination > pos && afterDestination < max && src.charCodeAt(afterDestination) !== closeParenCode) {
    const parsedTitle = parseVideoTitle(state, src, afterDestination, max)

    if (!parsedTitle) {
      return false
    }

    title = parsedTitle.title
    pos = skipSpaces(src, parsedTitle.pos, max)
  } else {
    pos = afterDestination
  }

  if (pos >= max || src.charCodeAt(pos) !== closeParenCode) {
    return false
  }

  if (!silent) {
    const token = state.push("video", "video", 0)
    const label = src.slice(start + 2, labelEnd)

    token.attrs = [[ "src", state.md.normalizeLink(destination.src) ]]
    token.content = label
    token.markup = "?"
    token.children = []

    if (title) {
      token.attrSet("title", title)
    }

    state.md.inline.parse(label, state.md, state.env, token.children)
  }

  state.pos = pos + 1

  return true
}

function setAttribute(token: Token, name: string, value: VideoAttributeValue) {
  if (value === false || value === null || typeof value === "undefined") {
    return
  }

  token.attrSet(name, value === true
    ? ""
    : String(value))
}

function applyVideoOptions(token: Token, options: Required<Omit<MarkdownVideoTagOptions, "attrs" | "className" | "poster" | "validateSrc">> & Pick<MarkdownVideoTagOptions, "attrs" | "className" | "poster">) {
  setAttribute(token, "controls", options.controls)
  setAttribute(token, "preload", options.preload)
  setAttribute(token, "autoplay", options.autoplay)
  setAttribute(token, "loop", options.loop)
  setAttribute(token, "muted", options.muted)
  setAttribute(token, "playsinline", options.playsInline)
  setAttribute(token, "poster", options.poster)

  if (options.className) {
    token.attrJoin("class", options.className)
  }

  for (const [ name, value ] of Object.entries(options.attrs || {})) {
    setAttribute(token, name, value)
  }

  if (options.labelAsAriaLabel && token.content && !token.attrGet("aria-label")) {
    token.attrSet("aria-label", token.content)
  }
}

const videoTag: PluginWithOptions<MarkdownVideoTagOptions> = (md, options = {}) => {
  const normalizedOptions = {
    controls: options.controls ?? true,
    preload: options.preload ?? "metadata",
    autoplay: options.autoplay ?? false,
    loop: options.loop ?? false,
    muted: options.muted ?? false,
    playsInline: options.playsInline ?? true,
    labelAsAriaLabel: options.labelAsAriaLabel ?? true,
    attrs: options.attrs,
    className: options.className,
    poster: options.poster,
  }

  md.inline.ruler.before("text", "video_tag", (state, silent) => {
    const originalPos = state.pos
    const parsed = parseVideoTag(state, silent)

    if (!parsed) {
      state.pos = originalPos

      return false
    }

    const token = state.tokens.at(-1)

    if (!silent && token?.type === "video") {
      const rawSrc = token.attrGet("src") || ""
      const validateSrc = options.validateSrc || md.validateLink

      if (!validateSrc(rawSrc)) {
        state.tokens.pop()
        state.pos = originalPos

        return false
      }

      applyVideoOptions(token, normalizedOptions)
    }

    return true
  })

  md.renderer.rules["video"] = (tokens, idx, renderOptions, env, self) => {
    const token = tokens[idx]

    if (!token) {
      return ""
    }

    const fallback = token.children
      ? self.renderInline(token.children, renderOptions, env)
      : ""

    return `<video${self.renderAttrs(token)}>${fallback}</video>`
  }
}

export default videoTag
