import type {
  BlogFilters,
  DateMode,
  ParsedBlogSearch,
} from "~/types"

function tokenize(query: string): string[] {
  const tokens: string[] = []
  let current = ""
  let inQuotes = false

  for (let index = 0; index < query.length; index += 1) {
    const char = query[index]
    const prevChar = index > 0
      ? query[index - 1]
      : undefined

    if (char === "\"" && prevChar !== "\\") {
      inQuotes = !inQuotes
      current += char

      continue
    }

    if (char === " " && !inQuotes) {
      if (current) {
        tokens.push(current)
        current = ""
      }

      continue
    }

    current += char
  }

  if (current) {
    tokens.push(current)
  }

  return tokens
}

function stripWrappingQuotes(value: string): string {
  if (!value) {
    return value
  }

  if (value.startsWith("\"") && value.endsWith("\"")) {
    return value.slice(1, -1)
  }

  return value
}

function normalizeTagValue(value: string): string[] {
  const trimmed = stripWrappingQuotes(value.trim())

  if (!trimmed) {
    return []
  }

  return trimmed.split(",")
    .map((tag) => stripWrappingQuotes(tag.trim()))
    .map((tag) => tag.toLowerCase())
    .filter((tag) => tag.length > 0)
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0)
    .getDate()
}

function formatNumber(value: number): string {
  return value.toString()
    .padStart(2, "0")
}

function normalizeDate(value: string, mode: DateMode): string | undefined {
  const trimmed = stripWrappingQuotes(value.trim())

  if (!trimmed) {
    return undefined
  }

  const match = trimmed.match(/^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/)

  if (!match) {
    return undefined
  }

  const yearValue = match[1]

  if (!yearValue) {
    return undefined
  }

  const year = Number.parseInt(yearValue, 10)
  const monthValue = match[2] ?? undefined
  const dayValue = match[3] ?? undefined

  const month = monthValue !== undefined
    ? Number.parseInt(monthValue, 10)
    : undefined
  const day = dayValue !== undefined
    ? Number.parseInt(dayValue, 10)
    : undefined

  if (month !== undefined && (month < 1 || month > 12)) {
    return undefined
  }

  if (day !== undefined && month !== undefined) {
    if (day < 1 || day > daysInMonth(year, month)) {
      return undefined
    }
  }

  if (mode === "before") {
    if (month === undefined) {
      return `${year}-01-01`
    }

    if (day === undefined) {
      return `${year}-${formatNumber(month)}-01`
    }

    return `${year}-${formatNumber(month)}-${formatNumber(day)}`
  }

  if (mode === "after") {
    if (month === undefined) {
      return `${year}-12-31`
    }

    if (day === undefined) {
      const lastDay = daysInMonth(year, month)

      return `${year}-${formatNumber(month)}-${formatNumber(lastDay)}`
    }

    return `${year}-${formatNumber(month)}-${formatNumber(day)}`
  }

  if (mode === "at") {
    if (month === undefined) {
      return `${year}`
    }

    if (day === undefined) {
      return `${year}-${formatNumber(month)}`
    }

    return `${year}-${formatNumber(month)}-${formatNumber(day)}`
  }

  return undefined
}

function getFirstQueryValue(value: string | string[] | null | undefined): string | undefined {
  if (!value) {
    return undefined
  }

  if (Array.isArray(value)) {
    return value[0] ?? undefined
  }

  return value
}

export function parseBlogSearch(rawQuery: string): ParsedBlogSearch {
  const query = (rawQuery ?? "")
    .trim()

  if (!query) {
    return {
      term: "",
      filters: {
        tags: [],
        before: undefined,
        after: undefined,
        at: undefined,
      },
    }
  }

  const tokens = tokenize(query)
  const searchTokens: string[] = []
  const tags = new Set<string>()
  let before: string | undefined
  let after: string | undefined
  let at: string | undefined

  for (const token of tokens) {
    const separatorIndex = token.indexOf(":")

    if (separatorIndex <= 0) {
      searchTokens.push(token)

      continue
    }

    const potentialKey = token.slice(0, separatorIndex)
      .toLowerCase()
    const rawValue = token.slice(separatorIndex + 1)

    if (potentialKey === "tag") {
      const normalizedValues = normalizeTagValue(rawValue)

      if (normalizedValues.length === 0) {
        searchTokens.push(token)

        continue
      }

      for (const tag of normalizedValues) {
        tags.add(tag)
      }

      continue
    }

    if (potentialKey === "before") {
      const normalizedDate = normalizeDate(rawValue, "before")

      if (!normalizedDate) {
        searchTokens.push(token)

        continue
      }

      before = normalizedDate

      continue
    }

    if (potentialKey === "after") {
      const normalizedDate = normalizeDate(rawValue, "after")

      if (!normalizedDate) {
        searchTokens.push(token)

        continue
      }

      after = normalizedDate

      continue
    }

    if (potentialKey === "at") {
      const normalizedDate = normalizeDate(rawValue, "at")

      if (!normalizedDate) {
        searchTokens.push(token)

        continue
      }

      at = normalizedDate

      continue
    }

    searchTokens.push(token)
  }

  return {
    term: searchTokens.join(" ")
      .trim(),
    filters: {
      tags: [...tags],
      before,
      after,
      at,
    },
  }
}

export function stringifyBlogSearch(filters: BlogFilters): string {
  const parts: string[] = []

  if (filters.search) {
    parts.push(filters.search.trim())
  }

  if (filters.tags?.length) {
    parts.push(`tag:${filters.tags.join(",")}`)
  }

  if (filters.before) {
    parts.push(`before:${filters.before}`)
  }

  if (filters.after) {
    parts.push(`after:${filters.after}`)
  }

  if (filters.at) {
    parts.push(`at:${filters.at}`)
  }

  return parts.join(" ")
    .trim()
}

export function buildSearchInputFromQuery(query: Record<string, string | string[] | null | undefined>): string {
  const baseSearch = getFirstQueryValue(query.search) ?? ""
  const parsedBase = parseBlogSearch(baseSearch)
  const extras: string[] = []

  const tagParam = getFirstQueryValue(query.tag)

  if (tagParam) {
    const routeTags = normalizeTagValue(tagParam)
    const missingTags = routeTags.filter((tag) => !parsedBase.filters.tags.includes(tag))

    if (missingTags.length > 0) {
      extras.push(`tag:${missingTags.join(",")}`)
    }
  }

  const beforeParam = getFirstQueryValue(query.before)

  if (beforeParam && parsedBase.filters.before !== beforeParam) {
    extras.push(`before:${beforeParam}`)
  }

  const afterParam = getFirstQueryValue(query.after)

  if (afterParam && parsedBase.filters.after !== afterParam) {
    extras.push(`after:${afterParam}`)
  }

  const atParam = getFirstQueryValue(query.at)

  if (atParam && parsedBase.filters.at !== atParam) {
    extras.push(`at:${atParam}`)
  }

  return [ baseSearch, ...extras ]
    .filter((part) => part && part.trim().length > 0)
    .join(" ")
    .trim()
}
