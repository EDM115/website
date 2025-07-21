export function useSwitchTheme() {
  const theme = localStorage.getItem("theme")

  if (theme === "light") {
    document.querySelectorAll("[class*='v-theme--dark']").forEach((el) => {
      el.classList.remove("v-theme--dark")
      el.classList.add("v-theme--light")
    })
  } else {
    document.querySelectorAll("[class*='v-theme--light']").forEach((el) => {
      el.classList.remove("v-theme--light")
      el.classList.add("v-theme--dark")
    })
  }
}
