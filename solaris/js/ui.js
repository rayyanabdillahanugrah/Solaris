import { CELESTIAL_DATA, PLANET_ORDER } from "./planets.js";
import { QuizController } from "./quiz.js";
import { CompareController } from "./compare.js";

const photoLoadStatus = new Map();

function loadPlanetPhoto(objectId) {
  const data = CELESTIAL_DATA[objectId];

  return new Promise((resolve) => {
    if (photoLoadStatus.get(objectId) === false) {
      resolve({ url: null, credit: "", alt: "" });
      return;
    }

    const img = new Image();
    img.onload = () => {
      photoLoadStatus.set(objectId, true);
      resolve({ url: data.photo, credit: data.photoCredit || "", alt: `Foto asli ${data.name}` });
    };
    img.onerror = () => {
      photoLoadStatus.set(objectId, false);
      resolve({ url: null, credit: "", alt: "" });
    };
    img.src = data.photo;
  });
}

export class UIController {
  constructor({ onSelectObject, onPlayPause, onSpeedChange, onResetView, onViewAll }) {
    this.onSelectObject = onSelectObject;
    this.onPlayPause = onPlayPause;
    this.onSpeedChange = onSpeedChange;
    this.onResetView = onResetView;
    this.onViewAll = onViewAll;

    this.$quickNav = document.getElementById("quick-nav");
    this.$infoPanel = document.getElementById("info-panel");
    this.$panelClose = document.getElementById("btn-panel-close");
    this.$panelOrder = document.getElementById("panel-order");
    this.$panelTitle = document.getElementById("panel-title");
    this.$panelTagline = document.getElementById("panel-tagline");
    this.$panelPhoto = document.getElementById("panel-photo");
    this.$panelPhotoImg = document.getElementById("panel-photo-img");
    this.$panelPhotoSkeleton = document.getElementById("panel-photo-skeleton");
    this.$panelPhotoCredit = document.getElementById("panel-photo-credit");
    this.$panelAbout = document.getElementById("panel-about");
    this.$panelAboutHeading = document.getElementById("panel-about-heading");
    this.$panelDataGrid = document.getElementById("panel-data-grid");
    this.$panelFeaturesSection = document.getElementById("panel-features-section");
    this.$panelFeaturesHeading = document.getElementById("panel-features-heading");
    this.$panelFeatures = document.getElementById("panel-features");
    this.$panelFacts = document.getElementById("panel-facts");
    this.$srAnnouncer = document.getElementById("sr-announcer");
    this.$gestureHint = document.getElementById("gesture-hint");
    this.$scaleDisclaimer = document.getElementById("scale-disclaimer");

    this.currentId = null;
    this._buildQuickNav();
    this._bindControlPanel();
    this._bindPanelClose();
    this._bindPanelSwipe();
    this._autoHideHints();
    this._initMusic();
    this._bindAboutModal();
    this.quiz = new QuizController();
    this.compare = new CompareController();
  }

  _bindAboutModal() {
    const $btnInfo = document.getElementById("btn-info-toggle");
    const $overlay = document.getElementById("about-overlay");
    const $btnClose = document.getElementById("btn-about-close");

    const open = () => {
      $overlay.hidden = false;
      $btnInfo.setAttribute("aria-pressed", "true");
    };
    const close = () => {
      $overlay.hidden = true;
      $btnInfo.setAttribute("aria-pressed", "false");
    };

    $btnInfo.addEventListener("click", open);
    $btnClose.addEventListener("click", close);
    $overlay.addEventListener("click", (e) => {
      if (e.target === $overlay) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !$overlay.hidden) close();
    });
  }

  _initMusic() {
    this.$music = document.getElementById("bg-music");
    this.$btnMusicToggle = document.getElementById("btn-music-toggle");

    if (!this.$music) return;
    this.$music.volume = 0.55;

    const markPlaying = (isPlaying) => {
      this.$btnMusicToggle.setAttribute("aria-pressed", String(isPlaying));
      this.$btnMusicToggle.setAttribute("aria-label", isPlaying ? "Jeda musik latar" : "Putar musik latar");
      this.$btnMusicToggle.classList.toggle("is-muted", !isPlaying);
    };

    const tryAutoplay = () => {
      const playPromise = this.$music.play();
      if (playPromise && playPromise.catch) {
        playPromise
          .then(() => markPlaying(true))
          .catch(() => {
            markPlaying(false);
            const startOnInteraction = () => {
              this.$music.play().then(() => markPlaying(true)).catch(() => {});
            };
            window.addEventListener("pointerdown", startOnInteraction, { once: true });
            window.addEventListener("keydown", startOnInteraction, { once: true });
          });
      }
    };

    tryAutoplay();

    this.$btnMusicToggle.addEventListener("click", () => {
      if (this.$music.paused) {
        this.$music.play().then(() => markPlaying(true));
      } else {
        this.$music.pause();
        markPlaying(false);
      }
    });
  }

  _buildQuickNav() {
    const addButton = (id, data) => {
      const btn = document.createElement("button");
      btn.className = "quick-nav__item";
      btn.type = "button";
      btn.dataset.id = id;
      btn.setAttribute("aria-current", "false");
      btn.innerHTML = `<span class="quick-nav__dot" style="background:${data.baseColorHex}"></span>${data.name}`;
      btn.addEventListener("click", () => this.onSelectObject(id));
      this.$quickNav.appendChild(btn);
    };

    addButton("sun", CELESTIAL_DATA.sun);
    PLANET_ORDER.forEach((id) => addButton(id, CELESTIAL_DATA[id]));
  }

  setActiveNavItem(id) {
    this.$quickNav.querySelectorAll(".quick-nav__item").forEach((btn) => {
      const isActive = btn.dataset.id === id;
      btn.setAttribute("aria-current", String(isActive));
    });
  }

  _bindControlPanel() {
    const btnPlayPause = document.getElementById("btn-play-pause");
    const iconWrap = document.getElementById("icon-play-pause");
    let playing = true;

    btnPlayPause.addEventListener("click", () => {
      playing = !playing;
      btnPlayPause.setAttribute("aria-pressed", String(playing));
      btnPlayPause.setAttribute("aria-label", playing ? "Jeda simulasi" : "Lanjutkan simulasi");
      btnPlayPause.querySelector(".label-text").textContent = playing ? "Jeda" : "Lanjut";
      iconWrap.innerHTML = playing
        ? '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>'
        : '<path d="M7 5l12 7-12 7V5z"/>';
      this.onPlayPause(playing);
    });

    document.querySelectorAll(".speed-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".speed-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        this.onSpeedChange(parseFloat(btn.dataset.speed));
      });
    });

    document.getElementById("btn-reset-view").addEventListener("click", () => {
      this.onResetView();
      this.closePanel();
      this.setActiveNavItem(null);
    });

    document.getElementById("btn-view-all").addEventListener("click", () => {
      this.onViewAll();
    });
  }

  _bindPanelClose() {
    this.$panelClose.addEventListener("click", () => this.closePanel());
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closePanel();
    });
  }

  _bindPanelSwipe() {
    const $grabber = this.$infoPanel.querySelector(".info-panel__grabber");
    if (!$grabber) return;

    let startY = 0;
    let currentY = 0;
    let dragging = false;
    const panelHeight = () => this.$infoPanel.getBoundingClientRect().height || 1;

    const onMove = (e) => {
      if (!dragging) return;
      currentY = e.clientY;
      const delta = Math.max(0, currentY - startY);
      this.$infoPanel.style.transition = "none";
      this.$infoPanel.style.transform = `translateY(${delta}px)`;
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      this.$infoPanel.style.transition = "";
      const delta = Math.max(0, currentY - startY);
      this.$infoPanel.style.transform = "";
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (delta > panelHeight() * 0.28) this.closePanel();
    };

    $grabber.addEventListener("pointerdown", (e) => {
      if (window.innerWidth > 720) return;
      dragging = true;
      startY = e.clientY;
      currentY = e.clientY;
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    });
  }

  _autoHideHints() {
    let dismissed = false;
    const hide = () => {
      if (dismissed) return;
      dismissed = true;
      this.$gestureHint.classList.add("is-hidden");
    };
    window.addEventListener("pointerdown", hide, { once: true });
    setTimeout(hide, 6000);

    setTimeout(() => {
      this.$scaleDisclaimer.classList.add("is-hidden");
    }, 7000);
  }

  async openPanel(id) {
    this.currentId = id;
    const data = CELESTIAL_DATA[id];
    this.setActiveNavItem(id);

    this.$panelOrder.textContent =
      data.kind === "star" ? "Bintang pusat Tata Surya" : `Planet ke-${data.order} dari Matahari`;
    this.$panelTitle.textContent = data.name;
    this.$panelTagline.textContent = data.tagline;
    this.$panelAboutHeading.textContent = `Tentang ${data.name}`;
    this.$panelAbout.textContent = data.about;

    this.$panelDataGrid.innerHTML = "";
    const gridItems = this._buildDataGridItems(data);
    gridItems.forEach(({ label, value }) => {
      const dt = document.createElement("div");
      dt.className = "data-grid__item";
      dt.innerHTML = `<dt>${label}</dt><dd>${value}</dd>`;
      this.$panelDataGrid.appendChild(dt);
    });

    if (data.features) {
      this.$panelFeaturesSection.hidden = false;
      this.$panelFeaturesHeading.textContent = "Ciri-ciri";
      this.$panelFeatures.innerHTML = data.features.map((f) => `<li>${f}</li>`).join("");
    } else {
      this.$panelFeaturesSection.hidden = true;
    }

    this.$panelFacts.innerHTML = data.funFacts.map((f) => `<li>${f}</li>`).join("");

    this.$panelPhoto.style.display = "";
    this.$panelPhotoImg.hidden = true;
    this.$panelPhotoCredit.hidden = true;
    this.$panelPhotoSkeleton.hidden = false;

    this.$infoPanel.classList.add("is-open");
    this.$infoPanel.setAttribute("aria-hidden", "false");
    this.$srAnnouncer.textContent = `Menampilkan informasi ${data.name}`;

    const photo = await loadPlanetPhoto(id);
    if (this.currentId !== id) return;
    this.$panelPhotoSkeleton.hidden = true;
    if (photo.url) {
      this.$panelPhotoImg.src = photo.url;
      this.$panelPhotoImg.alt = photo.alt || `Foto asli ${data.name}`;
      this.$panelPhotoImg.hidden = false;
      this.$panelPhotoCredit.textContent = photo.credit;
      this.$panelPhotoCredit.hidden = false;
    } else {
      this.$panelPhoto.style.display = "none";
    }
  }

  _buildDataGridItems(data) {
    if (data.kind === "star") {
      return [
        { label: "Diameter", value: `${data.diameterKm.toLocaleString("id-ID")} km` },
        { label: "Rotasi", value: `${(data.rotationHours / 24).toFixed(1)} hari` },
        ...data.facts.map((f) => ({ label: f.label, value: f.value })),
      ];
    }
    return [
      { label: "Diameter", value: `${data.diameterKm.toLocaleString("id-ID")} km` },
      { label: "Jarak rata-rata", value: `${(data.distanceFromSunKm / 1000000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} juta km` },
      { label: "Periode orbit", value: formatOrbitalPeriod(data.orbitalPeriodDays) },
      { label: "Rotasi", value: formatRotation(data.rotationHours) },
      { label: "Gravitasi", value: `${data.gravity} m/s²` },
      { label: "Satelit", value: `${data.moons}` },
    ];
  }

  closePanel() {
    this.currentId = null;
    this.$infoPanel.classList.remove("is-open");
    this.$infoPanel.setAttribute("aria-hidden", "true");
  }

  hideLoadingScreen() {
    const el = document.getElementById("loading-screen");
    el.classList.add("is-hidden");
    setTimeout(() => (el.style.display = "none"), 550);
  }
}

function formatOrbitalPeriod(days) {
  if (days < 500) return `${days.toLocaleString("id-ID")} hari`;
  const years = days / 365.25;
  return `${years.toLocaleString("id-ID", { maximumFractionDigits: 2 })} tahun`;
}

function formatRotation(hours) {
  const abs = Math.abs(hours);
  const retrograde = hours < 0 ? " (retrograde)" : "";
  if (abs < 48) return `${abs.toFixed(1)} jam${retrograde}`;
  return `${(abs / 24).toFixed(1)} hari${retrograde}`;
}
