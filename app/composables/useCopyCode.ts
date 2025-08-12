export function useCopyCode() {
  const handler = (event: Event) => {
    const btn = (event.target as HTMLElement).closest(".copy-code-button")

    if (!btn) {
      return
    }

    const block = btn.closest(".code-block")
    const codeEl = block?.querySelector("pre code")
    const text = codeEl?.textContent ?? ""

    void navigator.clipboard.writeText(text).then(() => {
      const orig = btn.textContent

      btn.textContent = "Copied !"
      btn.classList.add("copy-code-button-clicked")
      setTimeout(() => {
        btn.textContent = orig
        btn.classList.remove("copy-code-button-clicked")
      }, 3000)
    })
  }

  onMounted(() => document.addEventListener("click", handler))
  onUnmounted(() => document.removeEventListener("click", handler))
}
