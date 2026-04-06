import {
  readdir,
  readFile,
  writeFile,
} from "node:fs/promises"
import { join } from "node:path"

import type {
  GithubRepoResponse,
  ProjectData,
  ProjectPageConfig,
} from "./app/types.ts"

function extractProjectConfig(vueSource: string, path: string): ProjectPageConfig | null {
  const componentMatch = vueSource.match(/<HomeProjectPage\b([\s\S]*?)\/>/m)

  if (!componentMatch?.[1]) {
    return null
  }

  const attrs = componentMatch[1]
  const repoMatch = attrs.match(/\bname\s*=\s*["']([^"']+)["']/)

  if (!repoMatch?.[1]) {
    return null
  }

  const branchMatch = attrs.match(/\bbranch\s*=\s*["']([^"']+)["']/)

  return {
    repo: repoMatch[1],
    branch: branchMatch?.[1] || "master",
    path,
  }
}

function toGithubHeaders(): Record<string, string> {
  return {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2026-03-10",
  }
}

async function readProjectPages(projectsDir: string): Promise<ProjectPageConfig[]> {
  const entries = await readdir(projectsDir, { withFileTypes: true })
  const pages = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".vue"))
    .map((entry) => entry.name)

  const configs = await Promise.all(pages.map(async (fileName) => {
    const source = await readFile(join(projectsDir, fileName), "utf-8")
    const path = fileName.replace(/\.vue$/, "")

    return extractProjectConfig(source, path)
  }))

  return configs.filter((item): item is ProjectPageConfig => Boolean(item))
}

async function fetchRepoMetadata(repo: string): Promise<{
  name: string;
  description: string;
}> {
  const response = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: toGithubHeaders(),
  })

  if (!response.ok) {
    throw new Error(`GitHub API failed for ${repo} (status ${response.status})`)
  }

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  const json = await response.json() as GithubRepoResponse

  if (!json.full_name) {
    throw new Error(`GitHub API returned no full_name for ${repo}`)
  }

  return {
    name: json.full_name,
    description: json.description || "",
  }
}

function dedupeProjects(projects: ProjectPageConfig[]): ProjectPageConfig[] {
  const unique = new Map<string, ProjectPageConfig>()

  for (const project of projects) {
    unique.set(`${project.repo}::${project.branch}`, project)
  }

  return [...unique.values()]
}

async function generateProjectsData(): Promise<void> {
  console.log("🔄️ Generating projects metadata...\n")

  const cwd = process.cwd()
  const projectsDir = join(cwd, "app", "pages", "projects")
  const outputPath = join(cwd, "app", "assets", "data", "projects.json")

  const projectConfigs = dedupeProjects(await readProjectPages(projectsDir))
  const generated: ProjectData[] = []

  for (const config of projectConfigs) {
    try {
      // oxlint-disable-next-line no-await-in-loop
      const details = await fetchRepoMetadata(config.repo)

      generated.push({
        repo: config.repo,
        branch: config.branch,
        path: config.path,
        name: details.name,
        description: details.description,
      })
    } catch (error) {
      console.warn(`⚠️  Could not fetch ${config.repo}, using fallback data.`)
      console.warn(error)

      generated.push({
        repo: config.repo,
        branch: config.branch,
        path: config.path,
        name: config.repo,
        description: "",
      })
    }
  }

  generated.sort((a, b) => a.repo.localeCompare(b.repo))

  await writeFile(outputPath, `${JSON.stringify(generated, null, 2)}\n`, "utf-8")

  console.log(`✅ Generated app/assets/data/projects.json (${generated.length} projects)\n`)
}

try {
  await generateProjectsData()
} catch (error) {
  console.error("❌ Error generating project data :", error)
  process.exitCode = 1
}
