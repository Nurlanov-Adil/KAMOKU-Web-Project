# KAMOKU — Final Project

Nurlanov Adil · IT-2505 · WEB Technologies 1 (Front End)

This is the Final release of the same KAMOKU Midterm/Endterm project.

- Repository: https://github.com/Nurlanov-Adil/KAMOKU-Web-Project
- GitHub Pages: https://nurlanov-adil.github.io/KAMOKU-Web-Project/
- Pages: `index.html` (Home), `events.html` (Live and saved tracks).

## Run

No build or npm installation is needed. All production libraries and graphics are local.

For reliable saved data across pages, serve the folder over HTTP, or use GitHub Pages. In the project folder run:

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000. Direct `file://` opening is useful for a visual preview, but browsers may give separate storage areas to different local files.

## New for the Final

- A native keyboard-accessible Dark mode toggle on both pages. It uses a saved choice, or the operating-system preference initially, and persists after reload and navigation.
- Home song cards can be saved. Live displays the saved list, navigation count and exact combined duration. Remove one item or clear all.
- State is JSON in `localStorage`: `kamoku.theme.v1` and `kamoku.favorites.v1`. Favorite IDs are validated and deduplicated; broken JSON and empty storage are handled. Two open tabs stay synchronized.
- If browser storage is blocked, the current page continues in memory and explains that choices cannot persist. Personal booking information is never stored.
- Endterm feedback: Home has its own `Home / About / Members / Songs / FAQ` section row. The current section highlights during scrolling. Live does not display Home-section links, preventing page/section confusion.
- Source is formatted for reading. Original song search/filter/sort, booking validation, calculated price, SVG identity and three jQuery effects remain.

## Files

- `js/storage.js`: guarded JSON storage and fallback notice.
- `js/theme.js`: early theme application and toggle.
- `js/library.js`: favorites, counter, cross-page list, removal, duration, storage synchronization.
- `js/home-nav.js`: Home section tracking using a scheduled scroll/resize update.
- `js/data.js`: original catalogue and event objects plus format helpers.
- `js/songs.js`: search/filter/sort and DOM-generated track cards.
- `js/booking.js`: demo events, inline validation and dynamic pricing.
- `js/effects.js`: jQuery slide, scroll and fade; menu and Escape.
- `css/style.css`: shared variable-based light/dark system and responsive rules.
- `images/`: original SVG graphics.
- `vendor/`: Bootstrap CSS, jQuery and their MIT license texts.
- `docs/FINAL-CHANGES.md`, `docs/QA-FINAL.md`: changes and verification evidence.
- `DEFENSE.md`: explanation and two-minute demonstration guide.

## Verification

Both pages passed at 375, 768 and 1280 px in light and dark modes. Browser checks cover persistence across reload/navigation, remove/clear, cross-tab synchronization, broken/invalid/blocked storage, scrollspy, keyboard theme toggle, mobile menu/Escape, catalogue, form and repeated animation clicks. W3C Nu reported zero HTML errors for both source pages. axe-core reported no WCAG A/AA violations in the tested four desktop page/theme states. These checks do not constitute a full screen-reader audit. See docs for exact scope.

## Update the existing GitHub repository

1. Keep the existing repository and its history. This ZIP does not contain or replace a `.git` folder.
2. Copy the release files into the existing repository root. `index.html`, `events.html`, `css`, `js`, `images` and `vendor` must remain at that level; do not add another nesting layer.
3. Save and commit your reviewed changes with an accurate description before the course deadline. No commits were backdated, and the Codex development commits are not student-authored work history.
4. Push/upload to the same `main` branch used by GitHub Pages. Verify the deployed version, both themes, saving across pages and form behavior.
5. Submit `Final_Nurlanov_Adil.zip` and `Final_Nurlanov_Adil.docx` separately in the LMS Final exam folder. Confirm the full-name spelling and deadline required by the instructor.

This delivery was prepared locally; it has not pushed or deployed the Final files to your account.

## Credits and demo scope

KAMOKU is a student project by Nurlanov Adil. OpenAI ChatGPT/Codex assisted with generating and revising the Midterm, Endterm and Final code, design, original code-generated SVG graphics and documentation. The project is not claimed as independently handwritten code. The band, tracks and events are fictional. No external photographs, image-generation service, downloaded template or web font is used.

- Bootstrap 5.3.8 — MIT — https://getbootstrap.com/ — grid and form CSS.
- jQuery 3.7.1 — MIT — https://jquery.com/ — effects.
- Prettier 3.6.2 — formatting tool, not a production dependency.
- Playwright/Google Chrome, axe-core and W3C Nu — verification tools, not shipped website dependencies.

Bookings are demos without a backend. No real tickets, payment, email delivery or personal-data storage is provided. Past shows cannot be booked; availability follows the visitor's local date. The same AI and library credits appear on both pages and in the Final report.
