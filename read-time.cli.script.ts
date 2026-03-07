import readingTime from "reading-time"

import { readFile } from "node:fs/promises"

function msToReadableTime(ms: number): string {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)

  const parts = []

  if (hours > 0) {
    parts.push(`${hours}h`)
  }

  if (minutes > 0) {
    parts.push(`${minutes}min`)
  }

  if (seconds > 0) {
    parts.push(`${seconds}s`)
  }

  return parts.join(" ")
}

async function main() {
  const [ , , filePath ] = process.argv

  if (!filePath) {
    console.error("Usage : pnpm cli:count-words <file-path>")
    process.exit(1)
  }

  try {
    const text = await readFile(filePath, "utf-8")
    const stats = readingTime(text, { wordsPerMinute: 230 })

    console.log(`⏱️  Estimated time : ${stats.minutes} min (${stats.words} words)`)
    console.log(`   📖 ${msToReadableTime(stats.time)}`)
  } catch (err) {
    console.error("Error reading file :", err)
    process.exit(1)
  }
}

await main()
