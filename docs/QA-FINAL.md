# Final verification — 17 November 2026

Local release build, Google Chrome via Playwright. 95 checks recorded. Both pages at 375 / 768 / 1280 px in light and dark modes: no horizontal document overflow.

## Functional checks

- Keyboard-operated theme toggle; theme persists after reload and page navigation.
- Favorites persist, render on the other page and calculate exact duration; remove-one and clear-all update both pages.
- Cross-tab favorites/theme updates.
- Empty/malformed JSON, duplicate and unknown IDs, and blocked localStorage handled without uncaught errors.
- Scrollspy for About, Members, Songs and FAQ; Home anchor return.
- Search, combined empty filter state and title/duration sorting.
- Form required errors, field correction, invalid decimal, calculated 22,500 KZT total, success and reset in both modes.
- Rapid disclosure clicks, menu/Escape and reduced-motion behavior.
- No uncaught JS errors or failed HTTP requests in the run.

## Validation

W3C Nu checked both source HTML pages: zero errors. Informational trailing-slash notices from HTML formatting are not validation errors. axe-core 4.10.3 checked WCAG A/AA tags on both desktop pages in both modes: zero violations in those states. These automated checks do not replace a full manual/screen-reader audit.

This is not a production-deployment result. Verify the uploaded Final at the existing GitHub Pages address before submission.
