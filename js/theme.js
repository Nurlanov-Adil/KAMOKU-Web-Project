/* Run before CSS to avoid a light flash when a saved dark preference exists. */
"use strict";
(() => {
  const key = "kamoku.theme.v1";
  const stored = KamokuStorage.read(key, null);
  const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const initial =
    stored && ["light", "dark"].includes(stored.mode) ? stored.mode : preferred;

  function apply(mode) {
    document.documentElement.dataset.theme = mode;
    const toggle = document.querySelector("#theme-toggle");
    if (toggle) toggle.setAttribute("aria-pressed", String(mode === "dark"));
  }

  apply(initial);
  document.addEventListener("DOMContentLoaded", () => {
    apply(document.documentElement.dataset.theme);
    document.querySelector("#theme-toggle").addEventListener("click", () => {
      const mode =
        document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      apply(mode);
      KamokuStorage.write(key, { mode });
    });
  });

  // Keep two open KAMOKU tabs consistent without a reload.
  window.addEventListener("storage", (event) => {
    if (event.key !== key && event.key !== null) return;
    const value = KamokuStorage.read(key, null);
    apply(
      value && ["light", "dark"].includes(value.mode) ? value.mode : preferred,
    );
  });
})();
