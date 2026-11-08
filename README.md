# KAMOKU Endterm — Nurlanov Adil

An improvement of the existing **KAMOKU** Midterm, not a new topic or template.
Original author: Nurlanov Adil · IT-2505. The original `.git` history and remote are retained.

## Open the site

Unzip the archive and open `index.html` in a browser. All libraries and artwork are local; no build, CDN or internet is needed for the site. Alternatively run `python3 -m http.server 8000` in this folder and open http://localhost:8000.

There are two pages, matching the individual-student requirement: `index.html` (Home) and `events.html` (Live).

## Original inspection

The supplied archive contained `index.html`, `events.html`, `style.css`, `README.md`, `.gitignore`, `.git` and macOS metadata. No JS or image assets existed. Original content retained: 科目 KAMOKU, Astana / 2026 identity, members Nursultan (Guitar), Adil (Keyboard), Alina (Drums), songs Neon Rain / After 2AM / No Signal, and original three event names and dates. The older root stylesheet was replaced by `css/style.css`; an extra unmatched closing section was removed. macOS metadata is excluded.

## Features

- Custom SVG record sleeves, instrument graphics and live poster. No external photographs, missing images or template.
- Eight song objects with six properties, rendered with DOM APIs. Combined search, genre filter, duration/title/year sorting, result count, calculated duration, no-result reset and expandable notes.
- Four events rendered from data; past shows stay in the archive and cannot be booked. Availability uses the visitor's local date. On 8 November 2026 two upcoming demo events are available; after the final date booking closes with a message.
- Dynamic price = base price × ticket multiplier × quantity. Supporter costs 1.5 times Standard; quantities are whole numbers from 1 to 6. No fee.
- Eight-field Bootstrap form, including optional notes. Required fields plus email, phone, name length, event availability, ticket choice, integer/range and notes validation. Inline errors, error correction, first-invalid focus, success and reset.
- Three distinct jQuery effects: disclosure slide, animated section scrolling, fade for results and confirmation. Queues are cleared for repeated clicks; reduced motion is honored. CSS button/card hover effects.
- Responsive navbar, active page, Escape to close mobile navigation, skip link, visible focus, labelled fields, ARIA states, alt text and live status.

**Demo scope:** fictional band and events; no real recordings, tickets, payments or emails. Form data is not transmitted or stored. No fake audio/social/contact buttons.

## Files for defense

- `js/data.js`: shared song/event arrays and formatting helpers.
- `js/songs.js`: filter/sort and DOM rendering.
- `js/booking.js`: event rendering, validation, price and submit/reset.
- `js/effects.js`: jQuery animations and mobile navigation.
- `css/style.css`: visual system and responsive rules.
- `images/`: original SVG assets.
- `vendor/`: local Bootstrap CSS, jQuery and MIT licenses.
- `docs/`: report draft, editable report notes, browser QA record, screenshots and submission checklist.

## Validation

Chrome browser tests passed on both pages at 375, 768 and 1280 px. No horizontal document overflow, JS page errors or HTTP failures in those tests. Tested search/filter/sort, empty state/reset, rapid disclosure clicks, invalid form, corrected errors, date availability, price (5,000 × 1.5 × 3 = 22,500 KZT), success/reset, mobile menu/Escape and reduced motion. These tests do not replace reviewing the deployed GitHub Pages URL.

## Credits

Original Midterm author and project: Nurlanov Adil. Endterm HTML/CSS/JS, documentation and original code-generated SVG graphics: OpenAI Codex AI assistance. Extra songs/events are fictional AI-assisted demo content. No image generation model, external photos, downloaded template or external font was used.

Bootstrap 5.3.8 — MIT, https://getbootstrap.com/ — grid and form styles. jQuery 3.7.1 — MIT, https://jquery.com/ — effects. License texts are in `vendor/`. Credits also appear on both pages and in the report draft.

## Finish submission in the original repository

Original repository: https://github.com/Nurlanov-Adil/Nurlanov_Adil_Assignment3

1. Review and understand the code. Record your own contribution accurately in the report; this delivery's new commits are transparently authored by OpenAI Codex. No student commit history was manufactured.
2. Update the same Midterm checkout. If you already have it locally, copy the site files into it **without replacing your existing `.git` directory**. This ZIP includes the original history only to preserve provenance for standalone use.
3. Commit your reviewed changes before the instructor's deadline. Do not claim the two delivery commits demonstrate regular personal development. Do not backdate commits.
4. Push to the existing repository. In GitHub Settings → Pages, select Deploy from a branch → main → / (root), if that is your course's deployment method. Verify the live pages and controls.
5. Add the actual verified deployed URL to the report. This workspace has not pushed or published anything to GitHub.
6. Final report must be PDF or DOCX, with accurate contributions, screenshots, credits, repository and deployment URLs. `docs/Endterm_Nurlanov_Adil_Report_DRAFT.pdf` is a draft until the missing deployment URL and contribution review are complete.
7. Submit `Endterm_Nurlanov_Adil.zip` and your finalized report using the instructor's exact full-name spelling. Confirm the deadline yourself; it was not supplied here.

Do not create a new repository for this work. Keep the topic and original repository identity.
