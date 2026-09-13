const APPS = [
  {
    name: "Yasir Capcut",
    category: "video",
    categoryLabel: "Video Editor",
    platform: "Android",
    version: "v1.0",
    badge: "New",
    description: "A mobile video-editing app published by Yasir.",
    features: ["Full Pro Unlocked", "No VPN Required", "Latest Version", "All Options Available"],
    icon: "assets/icons/yasir-capcut.svg",
    download: "https://github.com/yasirrahim12/yasir-apps/releases/download/v1.0/Yasir.apk"
  },
  {
    name: "Yasir Game Hub",
    category: "games",
    categoryLabel: "Game Hub",
    platform: "Android",
    version: "v.2.0",
    badge: "New",
    description: "Yasir Game Hub — the latest public release.",
    features: ["Android", "Latest Release"],
    icon: "assets/icons/yasir-game-hub.png",
    download: "https://github.com/yasirrahim12/yasir-apps/releases/download/v.2.0/yasir_game_hub.apk"
  }
];

/* Future apps are added only to APPS.
   The cards, search, filters, sorting, stats and detail modal update automatically. */

const appGrid = document.querySelector("#appGrid");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const toast = document.querySelector("#toast");
const modal = document.querySelector("#appModal");
const modalContent = document.querySelector("#modalContent");
const viewToggle = document.querySelector("#viewToggle");

let activeFilter = "all";
let listView = false;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"
  }[char]));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function card(app, index) {
  const name = escapeHTML(app.name);
  return `
    <article class="app-card" style="--delay:${index * 45}ms">
      <div class="app-top">
        <div class="app-main">
          <div class="app-icon">
            <img src="${escapeHTML(app.icon)}" alt="${name} icon" width="72" height="72" loading="lazy">
          </div>
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="app-title truncate">${name}</h3>
              <span class="app-badge new">${escapeHTML(app.badge)}</span>
            </div>
            <div class="app-meta">${escapeHTML(app.categoryLabel)} · ${escapeHTML(app.platform)} · ${escapeHTML(app.version)}</div>
          </div>
        </div>
        <span class="app-badge">Yasir</span>
      </div>

      <p class="app-summary">${escapeHTML(app.description)}</p>

      <div class="feature-pills">
        ${app.features.map(feature => `<span class="app-badge">✓ ${escapeHTML(feature)}</span>`).join("")}
      </div>

      <div class="app-actions">
        <span class="direct-label">Direct release</span>
        <div class="flex gap-2">
          <button class="app-button detail-button" type="button" data-details="${index}">Details</button>
          <a class="app-button" href="${escapeHTML(app.download)}" data-download="${index}">Download <span>↓</span></a>
        </div>
      </div>
    </article>
  `;
}

function filteredApps() {
  const query = searchInput.value.trim().toLowerCase();
  const result = APPS.filter(app => {
    const inCategory = activeFilter === "all" || app.category === activeFilter;
    const haystack = [app.name, app.categoryLabel, app.platform, app.version, app.description, ...app.features]
      .join(" ")
      .toLowerCase();
    return inCategory && haystack.includes(query);
  });

  return result.sort((a, b) => {
    if (sortSelect.value === "name") return a.name.localeCompare(b.name);
    if (sortSelect.value === "category") return a.categoryLabel.localeCompare(b.categoryLabel);
    return APPS.indexOf(a) - APPS.indexOf(b);
  });
}

function renderApps() {
  const result = filteredApps();
  appGrid.classList.toggle("list-view", listView);
  viewToggle.textContent = listView ? "▤" : "▦";
  viewToggle.setAttribute("aria-label", listView ? "Switch to grid view" : "Switch to list view");

  appGrid.innerHTML = result.map((app, index) => card(app, index)).join("");
  emptyState.classList.toggle("hidden", result.length !== 0);

  document.querySelector("#statApps").textContent = String(APPS.length);
  document.querySelector("#statPlatforms").textContent = new Set(APPS.map(app => app.platform)).size;
}

function openModal(index) {
  const app = APPS[index];
  if (!app) return;

  modalContent.innerHTML = `
    <div class="flex items-center gap-4">
      <div class="modal-content-icon">
        <img src="${escapeHTML(app.icon)}" alt="${escapeHTML(app.name)} icon" width="76" height="76">
      </div>
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h2 id="modalTitle" class="modal-title">${escapeHTML(app.name)}</h2>
          <span class="app-badge new">${escapeHTML(app.badge)}</span>
        </div>
        <p class="mt-1 text-xs text-zinc-500">${escapeHTML(app.categoryLabel)} · ${escapeHTML(app.platform)} · ${escapeHTML(app.version)}</p>
      </div>
    </div>

    <p class="modal-copy mt-5">${escapeHTML(app.description)}</p>

    <div class="modal-list">
      ${app.features.map(feature => `<div>✓ ${escapeHTML(feature)}</div>`).join("")}
    </div>

    <div class="mt-5 flex flex-wrap gap-2">
      <a class="primary-button" href="${escapeHTML(app.download)}">Download APK <span>↓</span></a>
      <button class="secondary-button" type="button" data-copy="${escapeHTML(app.download)}">Copy download link</button>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderApps();
  });
});

searchInput.addEventListener("input", renderApps);
sortSelect.addEventListener("change", renderApps);

viewToggle.addEventListener("click", () => {
  listView = !listView;
  renderApps();
});

appGrid.addEventListener("click", event => {
  const detailButton = event.target.closest("[data-details]");
  if (detailButton) {
    openModal(Number(detailButton.dataset.details));
    return;
  }

  const download = event.target.closest("[data-download]");
  if (download) {
    const index = Number(download.dataset.download);
    showToast(`Opening ${APPS[index].name} download…`);
  }
});

modal.addEventListener("click", async event => {
  if (event.target.closest("[data-close-modal]")) {
    closeModal();
    return;
  }

  const copyButton = event.target.closest("[data-copy]");
  if (copyButton) {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copy);
      showToast("Download link copied");
    } catch {
      showToast("Copy not available in this browser");
    }
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

document.querySelector("#openAbout").addEventListener("click", () => {
  document.querySelector("#about").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#copySite").addEventListener("click", async () => {
  const url = "https://yasirrahim12.github.io/yasir-apps/";
  try {
    await navigator.clipboard.writeText(url);
    showToast("Site link copied");
  } catch {
    showToast(url);
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderApps();
