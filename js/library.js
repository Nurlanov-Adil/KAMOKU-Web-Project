/* Favorite track IDs connect Home and Live. Catalogue details remain in data.js. */
"use strict";
window.KamokuLibrary = (() => {
  const key = "kamoku.favorites.v1";
  const validIds = new Set(KAMOKU.songs.map((song) => song.id));

  function normalize(value) {
    if (!value || value.version !== 1 || !Array.isArray(value.ids)) return [];
    return [
      ...new Set(
        value.ids.filter((id) => Number.isInteger(id) && validIds.has(id)),
      ),
    ];
  }

  let ids = normalize(KamokuStorage.read(key, null));

  function getSongs() {
    return ids.map((id) => KAMOKU.songs.find((song) => song.id === id));
  }

  function updateButtons() {
    document.querySelectorAll(".saved-count").forEach((counter) => {
      counter.textContent = String(ids.length);
    });
    document.querySelectorAll(".favorite-toggle").forEach((button) => {
      const id = Number(button.dataset.song);
      const song = KAMOKU.songs.find((item) => item.id === id);
      const saved = ids.includes(id);
      button.setAttribute("aria-pressed", String(saved));
      button.setAttribute(
        "aria-label",
        `${saved ? "Unsave" : "Save"} ${song.title}`,
      );
      button.textContent = saved ? "Saved ✓" : "Save track +";
    });
  }

  function renderSaved() {
    const list = document.querySelector("#saved-list");
    if (!list) return;
    const songs = getSongs();
    list.replaceChildren();
    songs.forEach((song) => {
      const row = document.createElement("article");
      row.className = "saved-track";
      // Only fixed catalogue data is inserted as HTML; storage contains validated IDs.
      row.innerHTML = `
                <img src="images/track-${song.id}.svg" alt="Record sleeve for ${song.title}" width="600" height="600">
                <div class="saved-track-info">
                    <p class="eyebrow">${song.genre} / ${song.year}</p>
                    <h3>${song.title}</h3>
                    <p>${KAMOKU.duration(song.seconds)}</p>
                </div>
                <button class="remove-saved text-button" type="button" data-song="${song.id}" aria-label="Remove ${song.title} from saved tracks">Remove ×</button>`;
      list.append(row);
    });
    const total = songs.reduce((seconds, song) => seconds + song.seconds, 0);
    document.querySelector("#saved-summary").textContent =
      `${songs.length} saved track${songs.length === 1 ? "" : "s"} · ${KAMOKU.duration(total)} total`;
    document.querySelector("#saved-empty").hidden = songs.length !== 0;
    document.querySelector("#clear-saved").disabled = songs.length === 0;
  }

  function notify(message) {
    const status = document.querySelector("#library-status");
    if (status) status.textContent = message;
  }

  function persist(message) {
    KamokuStorage.write(key, { version: 1, ids });
    updateButtons();
    renderSaved();
    notify(message);
  }

  document.addEventListener("click", (event) => {
    const save = event.target.closest(".favorite-toggle");
    if (save) {
      const id = Number(save.dataset.song);
      if (!validIds.has(id)) return;
      const existed = ids.includes(id);
      ids = existed ? ids.filter((value) => value !== id) : [...ids, id];
      const title = KAMOKU.songs.find((song) => song.id === id).title;
      persist(
        `${title} ${existed ? "removed from" : "added to"} your saved tracks. ${ids.length} saved.`,
      );
    }
    const remove = event.target.closest(".remove-saved");
    if (remove) {
      const buttons = [...document.querySelectorAll(".remove-saved")];
      const index = buttons.indexOf(remove);
      ids = ids.filter((id) => id !== Number(remove.dataset.song));
      persist("Track removed from your saved list.");
      const remaining = document.querySelectorAll(".remove-saved");
      const next = remaining[Math.min(index, remaining.length - 1)];
      (next || document.querySelector("#saved-heading")).focus({
        preventScroll: true,
      });
    }
  });

  const clear = document.querySelector("#clear-saved");
  if (clear)
    clear.addEventListener("click", () => {
      ids = [];
      persist("All saved tracks cleared.");
      document.querySelector("#saved-heading").focus({ preventScroll: true });
    });

  document.addEventListener("kamoku:rendered", updateButtons);
  window.addEventListener("storage", (event) => {
    if (event.key !== key && event.key !== null) return;
    ids = normalize(KamokuStorage.read(key, null));
    updateButtons();
    renderSaved();
    notify("Your saved list was updated in another tab.");
  });

  updateButtons();
  renderSaved();
  return { updateButtons };
})();
