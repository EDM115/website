import mdiCheck from "~icons/mdi/check?raw"

export function useCopySlug() {
  const handler = (event: Event) => {
    const target = event.target

    if (!(target instanceof HTMLElement)) {
      return
    }

    const el = target.closest(".header-copy-icon")

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

      el.innerHTML = mdiCheck
      el.classList.add("header-copy-icon-clicked")
      setTimeout(() => {
        el.innerHTML = original
        el.classList.remove("header-copy-icon-clicked")
      }, 3000)
    })
  }

  onMounted(() => {
    document.addEventListener("click", handler)
  })

  onUnmounted(() => {
    document.removeEventListener("click", handler)
  })
}
