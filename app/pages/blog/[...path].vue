<template>
  <HomeBlogPost :is-telegram="false" />
</template>

<script setup lang="ts">
let headings: HTMLElement[] = []
let scrollRaf = false

let scrollSpyEnabled = false
let userIntentListenersAttached = false

const activeHeadingId = ref<string | null>(null)

const route = useRoute()
const router = useRouter()
const { isMobile } = useDevice()

function moveTocOutsideMarkdownBody() {
  const body = document.querySelector<HTMLDivElement>("div.markdown-body")

  if (!body) {
    return
  }

  const first = body.firstElementChild as HTMLElement | null

  if (!first || !first.matches("nav.table-of-contents")) {
    return
  }

  // Already wrapped in .md-container ?
  if (body.parentElement?.classList.contains("md-container")) {
    const container = body.parentElement

    if (first.parentElement !== container) {
      container.insertBefore(first, body)
    }

    return
  }

  const parent = body.parentElement

  if (!parent) {
    return
  }

  if (isMobile.value) {
    const navbarPanel = document.querySelector<HTMLElement>("section.navbar-mobile-panel")

    if (navbarPanel) {
      const hr = document.createElement("hr")

      hr.className = "ui-divider"
      hr.style.border = "none"
      hr.style.borderTop = "1px solid color-mix(in srgb, var(--text) 20%, transparent)"
      hr.style.margin = "0.5rem 0"

      navbarPanel.appendChild(hr)
      navbarPanel.appendChild(first)

      return
    }

    body.removeChild(first)
  } else {
    const container = document.createElement("div")

    container.className = "md-container"

    parent.insertBefore(container, body)
    container.appendChild(first)
    container.appendChild(body)
  }
}

function deleteMdContainer() {
  if (isMobile.value) {
    const navbarPanel = document.querySelector<HTMLElement>("section.navbar-mobile-panel")

    if (navbarPanel) {
      const toc = navbarPanel.querySelector<HTMLElement>("nav.table-of-contents")

      if (toc) {
        navbarPanel.removeChild(toc)
        const lastElement = navbarPanel.lastElementChild

        if (lastElement && lastElement.tagName.toLowerCase() === "hr") {
          navbarPanel.removeChild(lastElement)
        }
      }
    }
  } else {
    const body = document.querySelector<HTMLDivElement>("div.markdown-body")

    if (body) {
      const parent = body.parentElement

      if (parent && parent.classList.contains("md-container")) {
        const grandParent = parent.parentElement

        if (grandParent) {
          grandParent.insertBefore(body, parent)
          grandParent.removeChild(parent)
        }
      }
    }
  }
}

function collectHeadings() {
  headings = Array.from(document.querySelectorAll<HTMLElement>(".markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6"))
}

function clearActiveTocItems() {
  document
    .querySelectorAll(".table-of-contents li.is-active")
    .forEach((li) => li.classList.remove("is-active"))
}

function setActiveTocItem(id?: string): boolean {
  clearActiveTocItems()

  const finalId = id ?? activeHeadingId.value ?? ""

  if (!finalId) {
    return false
  }

  const link = document.querySelector<HTMLAnchorElement>(`.table-of-contents a[href="#${CSS.escape(finalId)}"]`)

  if (!link) {
    return false
  }

  const li = link.closest("li")

  if (li) {
    li.classList.add("is-active")
  }

  return true
}

function updateActiveFromScroll() {
  if (!headings.length) {
    collectHeadings()

    if (!headings.length) {
      return
    }
  }

  const scrollPos = window.scrollY + (window.innerHeight * 0.3) - 80

  let current: HTMLElement | null = null

  for (const h of headings) {
    if (h.offsetTop <= scrollPos) {
      current = h
    } else {
      break
    }
  }

  if (!current?.id) {
    clearActiveTocItems()
    activeHeadingId.value = null

    return
  }

  activeHeadingId.value = current.id
  setActiveTocItem(current.id)
}

function onScroll() {
  if (!scrollSpyEnabled) {
    return
  }

  if (scrollRaf) {
    return
  }

  scrollRaf = true

  requestAnimationFrame(() => {
    scrollRaf = false
    updateActiveFromScroll()
  })
}

function enableScrollSpyOnce() {
  if (scrollSpyEnabled) {
    return
  }

  scrollSpyEnabled = true
  removeUserIntentListeners()
  updateActiveFromScroll()
}

function onUserWheelOrTouch() {
  enableScrollSpyOnce()
}

function onUserKeyDown(e: KeyboardEvent) {
  const keys = [
    "ArrowDown",
    "ArrowUp",
    "PageDown",
    "PageUp",
    "Home",
    "End",
    " ",
  ]

  if (keys.includes(e.key)) {
    enableScrollSpyOnce()
  }
}

function addUserIntentListeners() {
  if (userIntentListenersAttached) {
    return
  }

  userIntentListenersAttached = true
  window.addEventListener("wheel", onUserWheelOrTouch, { passive: true })
  window.addEventListener("touchmove", onUserWheelOrTouch, { passive: true })
  window.addEventListener("keydown", onUserKeyDown)
}

function removeUserIntentListeners() {
  if (!userIntentListenersAttached) {
    return
  }

  userIntentListenersAttached = false
  window.removeEventListener("wheel", onUserWheelOrTouch)
  window.removeEventListener("touchmove", onUserWheelOrTouch)
  window.removeEventListener("keydown", onUserKeyDown)
}

function onTocClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null

  if (!target) {
    return
  }

  const link = target.closest("a[href^='#']") as HTMLAnchorElement | null

  if (!link || !link.closest(".table-of-contents")) {
    return
  }

  e.preventDefault()

  const href = link.getAttribute("href") || ""
  const id = decodeURIComponent(href.replace("#", ""))

  if (!id) {
    return
  }

  const el = document.getElementById(id)

  if (!el) {
    return
  }

  scrollSpyEnabled = false
  addUserIntentListeners()

  setActiveTocItem(id)

  router.push({ hash: `#${id}` })
}

async function run() {
  await nextTick()
  moveTocOutsideMarkdownBody()
  collectHeadings()
  setActiveTocItem()
  addUserIntentListeners()
}

onMounted(async () => {
  await run()

  window.addEventListener("scroll", onScroll, { passive: true })

  const domToc = document.querySelector(".table-of-contents") as HTMLElement | null

  domToc?.addEventListener("click", onTocClick)
})

watch(() => route.path, async () => {
  await nextTick()
  moveTocOutsideMarkdownBody()
  collectHeadings()
  activeHeadingId.value = null
  clearActiveTocItems()
})

onBeforeUnmount(() => {
  deleteMdContainer()
  removeUserIntentListeners()

  window.removeEventListener("scroll", onScroll)
  const domToc = document.querySelector(".table-of-contents") as HTMLElement | null

  domToc?.removeEventListener("click", onTocClick)
})
</script>
