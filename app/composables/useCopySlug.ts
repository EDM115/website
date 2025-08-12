import mdiCheck from "~icons/mdi/check?raw"

export function useCopySlug() {
  const handler = (event: Event) => {
    const el = (event.target as HTMLElement).closest(".header-copy-icon")

    if (!el) {
      return
    }

    const slug = el.getAttribute("data-slug")

    if (!slug) {
      return
    }

    const url = `${location.origin}${location.pathname}#${slug}`

    void navigator.clipboard.writeText(url).then(() => {
      const original = el.innerHTML

      el.innerHTML = mdiCheck as unknown as string
      el.classList.add("header-copy-icon-clicked")
      setTimeout(() => {
        el.innerHTML = original
        el.classList.remove("header-copy-icon-clicked")
      }, 3000)
    })
  }

  onMounted(() => document.addEventListener("click", handler))
  onUnmounted(() => document.removeEventListener("click", handler))
}
