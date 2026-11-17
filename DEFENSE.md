# KAMOKU Final defense

## Demonstration — 90 seconds

- 0–15 seconds: introduce the fictional KAMOKU band and explain that the same project continues from Midterm/Endterm. Toggle dark mode with the keyboard.
- 15–40 seconds: save two tracks on Home. Open Saved on Live; show the count, exact duration and saved theme. Reload; remove a track and clear the list.
- 40–55 seconds: return to Home. Scroll through About and Members; show the highlighted section. Explain the instructor's Endterm feedback and the separate section row.
- 55–75 seconds: show the existing search and demo booking. For KAMOKU / 01, Supporter × 3 = 22,500 KZT. Show a field error and valid confirmation/reset.
- 75–90 seconds: show the 375 px view, theme control and menu. Briefly point out slide, fade and smooth-scroll effects.

Use demo@example.com and a demo name. Do not enter personal or sensitive details. The event list follows the current date; if a show has passed, choose another upcoming show.

## Explanation — 30 seconds of questions

**Where is the theme stored?** `theme.js` reads/writes an object containing mode through `storage.js`; the key is `kamoku.theme.v1`. The root `data-theme` selects CSS variables.

**Why JSON?** localStorage stores strings. `JSON.stringify` converts a JS value to a string; `JSON.parse` reads it back. Both have guarded handling in storage.js.

**What is saved for favorites?** Only known numeric song IDs and a schema version. The actual titles and durations come from data.js. No email/phone/password is saved.

**Why not add login?** The assignment allows either accounts or saved items. Favorites fit a music website and demonstrate state across two existing pages.

**How does removal work?** `filter` builds an array without the selected ID; the new JSON is saved and the list/counter/total are rendered again.

**How is the duration calculated?** `reduce` adds the seconds for each saved song, and `KAMOKU.duration` formats minutes and seconds.

**How does section highlighting work?** home-nav.js checks section positions below the sticky header. Scroll/resize events schedule one update per animation frame. The active link gets a class and `aria-current="location"`.

**What if storage is empty or corrupt?** Defaults are used. Invalid IDs and duplicates are ignored. Blocked storage falls back to memory and displays a notice.

**How would you find a bug?** Reproduce it, inspect Console/Network in DevTools, inspect localStorage in Application, and check event handlers and DOM values. Do not share private data in debug output.

**What did AI do?** ChatGPT/Codex assisted with all three project stages, including code, graphics and documentation. Explain your actual review, requirements, deployment and any edits truthfully; do not claim unaided authorship.

Have the website and VS Code open. Understand the code instead of reading answers from this file.
