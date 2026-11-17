/* JSON storage shared by both pages. No names, emails, phone numbers or passwords are saved. */
"use strict";
window.KamokuStorage = (() => {
  const memory = new Map();
  let available = true;

  function warn() {
    const notice = document.querySelector("#storage-notice");
    if (notice && !available) {
      notice.hidden = false;
      notice.textContent =
        "Browser storage is unavailable. Your choices work on this page but cannot be kept after leaving or reloading.";
    }
  }

  function read(key, fallback) {
    try {
      const raw = available
        ? window.localStorage.getItem(key)
        : memory.get(key);
      if (raw === null || raw === undefined) return fallback;
      return JSON.parse(raw);
    } catch (error) {
      // Malformed JSON is treated as empty data; blocked storage uses memory.
      if (!(error instanceof SyntaxError)) available = false;
      warn();
      return fallback;
    }
  }

  function write(key, value) {
    const json = JSON.stringify(value);
    memory.set(key, json);
    try {
      if (available) window.localStorage.setItem(key, json);
    } catch {
      available = false;
    }
    warn();
  }

  document.addEventListener("DOMContentLoaded", warn);
  return { read, write };
})();
