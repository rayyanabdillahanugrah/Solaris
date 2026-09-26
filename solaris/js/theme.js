const STORAGE_KEY = "tatasurya-theme";

export class ThemeController {
  constructor() {
    this.$toggle = document.getElementById("btn-theme-toggle");
    this.$iconSun = document.getElementById("icon-theme-sun");
    this.$iconMoon = document.getElementById("icon-theme-moon");
    this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    this.theme = this._resolveInitialTheme();
    this._apply(this.theme, { persist: false });

    this.$toggle.addEventListener("click", () => {
      this.theme = this.theme === "dark" ? "light" : "dark";
      this._apply(this.theme, { persist: true });
    });

    this.mediaQuery.addEventListener("change", (e) => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      this.theme = e.matches ? "dark" : "light";
      this._apply(this.theme, { persist: false });
    });
  }

  _resolveInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return this.mediaQuery.matches ? "dark" : "light";
  }

  _apply(theme, { persist }) {
    document.documentElement.setAttribute("data-theme", theme);
    this.$toggle.setAttribute("aria-pressed", String(theme === "dark"));
    this.$toggle.setAttribute("aria-label", theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap");
    this.$iconSun.hidden = theme === "dark";
    this.$iconMoon.hidden = theme !== "dark";
    if (persist) localStorage.setItem(STORAGE_KEY, theme);
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
  }
}
