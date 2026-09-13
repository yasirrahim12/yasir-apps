const APPS = [
  {
    name: "Yasir Capcut",
    category: "video",
    categoryLabel: "Video Editor",
    version: "v1.0",
    badge: "New",
    description: "A mobile video-editing app published by Yasir.",
    features: ["Full Pro Unlocked", "No VPN Required", "Latest Version", "All Options Available"],
    icon: "assets/icons/yasir-capcut.svg",
    download: "https://github.com/yasirrahim12/yasir-apps/releases/download/v1.0/Yasir.apk"
  },
  {
  name: "Yasir Game Hub",
  category: "other",
  categoryLabel: "Game Hub",
  version: "v.2.0",
  badge: "New",
  description: "Yasir Game Hub — the latest public release.",
  features: ["Android", "Latest Release"],
  icon: "https://yasirrahim12.github.io/yasir-apps/assets/icons/yasir-game-hub.png",
  download: "https://github.com/yasirrahim12/yasir-apps/releases/download/v.2.0/yasir_game_hub.apk"
}
];

const appGrid = document.querySelector("#appGrid");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const toast = document.querySelector("#toast");
let activeFilter = "all";

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"
  }[char]));
}

function appCard(app) {
  const safeName = escapeHTML(app.name);
  return `
    <article class="app-card p-5">
      <div class="flex items-start justify-between gap-4">
        <div class="flex min-w-0 items-center gap-4">
          <div class="app-icon">
            <img src="${escapeHTML(app.icon)}" alt="${safeName} icon" loading="lazy">
          </div>
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="truncate text-lg font-extrabold">${safeName}</h3>
              <span class="app-badge new-badge">${escapeHTML(app.badge)}</span>
            </div>
            <p class="mt-1 text-xs text-zinc-500">${escapeHTML(app.categoryLabel)} · ${escapeHTML(app.version)}</p>
          </div>
        </div>
        <span class="app-badge">Yasir</span>
      </div>

      <p class="mt-5 text-sm leading-6 text-zinc-400">${escapeHTML(app.description)}</p>

      <div class="mt-5 flex flex-wrap gap-2">
        ${app.features.map(feature => `<span class="app-badge">✓ ${escapeHTML(feature)}</span>`).join("")}
      </div>

      <div class="mt-5 flex items-center justify-between gap-3 border-t border-white/[.06] pt-4">
        <span class="text-xs text-zinc-600">Direct APK</span>
        <a class="download-button max-w-[10rem]" href="${escapeHTML(app.download)}" data-app="${safeName}">
          Download <span aria-hidden="true">↓</span>
        </a>
      </div>
    </article>
  `;
}

function renderApps() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = APPS.filter(app => {
    const matchesFilter = activeFilter === "all" || app.category === activeFilter;
    const haystack = [
      app.name, app.categoryLabel, app.version, app.description, ...app.features
    ].join(" ").toLowerCase();
    return matchesFilter && haystack.includes(query);
  });

  appGrid.innerHTML = filtered.map(appCard).join("");
  emptyState.classList.toggle("hidden", filtered.length !== 0);
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

appGrid.addEventListener("click", event => {
  const button = event.target.closest(".download-button");
  if (!button) return;
  toast.textContent = `Opening ${button.dataset.app} download…`;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderApps();
