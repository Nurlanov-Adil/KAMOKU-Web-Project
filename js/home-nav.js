/* A separate Home-only section navigation resolves the Endterm feedback. */
"use strict";
(() => {
  const links = [...document.querySelectorAll(".section-link")];
  const sections = links.map((link) =>
    document.querySelector(link.getAttribute("href")),
  );
  let pending = false;

  function updateCurrentSection() {
    const threshold = document.querySelector("header").offsetHeight + 90;
    let current = sections[0];
    // Choose the last section whose start has passed the reading line.
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= threshold) current = section;
    }
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2
    ) {
      current = sections[sections.length - 1];
    }
    links.forEach((link) => {
      const active = link.hash === "#" + current.id;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    pending = false;
  }

  function requestUpdate() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(updateCurrentSection);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("load", requestUpdate);
  document.addEventListener("kamoku:rendered", requestUpdate);
  updateCurrentSection();
})();
