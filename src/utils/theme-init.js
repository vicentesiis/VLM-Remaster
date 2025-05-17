;(function () {
  try {
    const isDark = localStorage.getItem("is_dark_mode") === "true"
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  } catch (e) {
    // Fail silently
  }
})()
