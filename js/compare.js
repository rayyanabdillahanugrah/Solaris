import { CELESTIAL_DATA, PLANET_ORDER } from "./planets.js";
import { MiniPlanetViewer } from "./miniPlanet.js";

const OBJECT_ORDER = ["sun", ...PLANET_ORDER];

const MAX_CIRCLE_PX = 210;
const MIN_CIRCLE_PX = 14;

export class CompareController {
  constructor() {
    this.$overlay = document.getElementById("compare-overlay");
    this.$body = document.getElementById("compare-body");
    this.$btnOpen = document.getElementById("btn-compare-open");
    this.$btnClose = document.getElementById("btn-compare-close");

    this.idA = "earth";
    this.idB = "mars";

    this.viewerA = null;
    this.viewerB = null;

    this.$btnOpen.addEventListener("click", () => this.open());
    this.$btnClose.addEventListener("click", () => this.close());
    this.$overlay.addEventListener("click", (e) => {
      if (e.target === this.$overlay) this.close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.$overlay.hidden) this.close();
    });
    window.addEventListener("resize", () => {
      if (!this.$overlay.hidden) {
        this.viewerA?.resize();
        this.viewerB?.resize();
      }
    });

    this._render();
  }

  open() {
    this.$overlay.hidden = false;
    requestAnimationFrame(() => this._mountViewers());
  }

  close() {
    this.$overlay.hidden = true;
    this._disposeViewers();
  }

  _optionsHtml(selectedId, disabledId) {
    return OBJECT_ORDER.map((id) => {
      const data = CELESTIAL_DATA[id];
      const selected = id === selectedId ? "selected" : "";
      const disabled = id === disabledId ? "disabled" : "";
      return `<option value="${id}" ${selected} ${disabled}>${data.name}</option>`;
    }).join("");
  }

  _render() {
    const dataA = CELESTIAL_DATA[this.idA];
    const dataB = CELESTIAL_DATA[this.idB];

    this.$body.innerHTML = `
      <div class="compare-picker">
        <select class="compare-select" id="compare-select-a" aria-label="Pilih Planet A">
          ${this._optionsHtml(this.idA, this.idB)}
        </select>
        <span class="compare-vs">VS</span>
        <select class="compare-select" id="compare-select-b" aria-label="Pilih Planet B">
          ${this._optionsHtml(this.idB, this.idA)}
        </select>
      </div>

      ${this._visualHtml(dataA, dataB)}

      <p class="compare-scale-note">
        Ukuran lingkaran mengikuti rasio diameter asli kedua objek. Objek yang jauh lebih
        kecil diberi ukuran minimum agar tetap terlihat — angka diameter di label tetap nilai sebenarnya.
        Seret sphere-nya untuk memutar.
      </p>

      ${this._tableHtml(dataA, dataB)}
    `;

    document.getElementById("compare-select-a").addEventListener("change", (e) => {
      this.idA = e.target.value;
      this._render();
    });
    document.getElementById("compare-select-b").addEventListener("change", (e) => {
      this.idB = e.target.value;
      this._render();
    });

    if (!this.$overlay.hidden) {
      this._disposeViewers();
      requestAnimationFrame(() => this._mountViewers());
    }
  }

  _disposeViewers() {
    this.viewerA?.dispose();
    this.viewerB?.dispose();
    this.viewerA = null;
    this.viewerB = null;
  }

  _mountViewers() {
    const $canvasA = document.getElementById("compare-canvas-a");
    const $canvasB = document.getElementById("compare-canvas-b");
    if (!$canvasA || !$canvasB) return;
    this.viewerA = new MiniPlanetViewer($canvasA, CELESTIAL_DATA[this.idA]);
    this.viewerB = new MiniPlanetViewer($canvasB, CELESTIAL_DATA[this.idB]);
  }

  _visualHtml(dataA, dataB) {
    const maxDiameter = Math.max(dataA.diameterKm, dataB.diameterKm);
    const scale = MAX_CIRCLE_PX / maxDiameter;

    const pxA = Math.max(dataA.diameterKm * scale, MIN_CIRCLE_PX);
    const pxB = Math.max(dataB.diameterKm * scale, MIN_CIRCLE_PX);

    const wrapHeight = (dataA.hasRings || dataB.hasRings ? MAX_CIRCLE_PX * 1.7 : MAX_CIRCLE_PX) + 8;

    return `
      <div class="compare-visual">
        ${this._circleColumnHtml(dataA, pxA, "a", wrapHeight)}
        ${this._circleColumnHtml(dataB, pxB, "b", wrapHeight)}
      </div>
    `;
  }

  _circleColumnHtml(data, sizePx, slot, wrapHeight) {
    const positionLabel =
      data.kind === "star" ? "Bintang pusat Tata Surya" : `Planet ke-${data.order} dari Matahari`;
    const canvasPx = data.hasRings ? Math.round(sizePx * 1.7) : sizePx;

    return `
      <div class="compare-column">
        <div class="compare-circle-wrap" style="height:${wrapHeight}px">
          <canvas id="compare-canvas-${slot}" class="compare-circle" width="${canvasPx}" height="${canvasPx}"
                  style="width:${canvasPx}px; height:${canvasPx}px"
                  aria-label="Model 3D ${data.name}, seret untuk memutar"></canvas>
        </div>
        <div class="compare-column__name">${data.name}</div>
        <div class="compare-column__diameter">${data.diameterKm.toLocaleString("id-ID")} km</div>
        <div class="compare-column__position">${positionLabel}</div>
      </div>
    `;
  }

  _tableHtml(dataA, dataB) {
    const rows = [
      ["Diameter", formatKm(dataA.diameterKm), formatKm(dataB.diameterKm)],
      ["Massa", formatMass(dataA.massKg), formatMass(dataB.massKg)],
      ["Jarak dari Matahari", formatDistance(dataA), formatDistance(dataB)],
      ["Periode orbit", formatOrbitalPeriod(dataA), formatOrbitalPeriod(dataB)],
      ["Periode rotasi", formatRotation(dataA), formatRotation(dataB)],
      ["Gravitasi", formatGravity(dataA), formatGravity(dataB)],
      ["Jumlah satelit", formatMoons(dataA), formatMoons(dataB)],
      ["Temperatur rata-rata", formatTemp(dataA), formatTemp(dataB)],
    ];

    const rowsHtml = rows
      .map(
        ([label, valA, valB]) => `
        <tr>
          <th scope="row">${label}</th>
          <td>${valA}</td>
          <td>${valB}</td>
        </tr>
      `
      )
      .join("");

    return `
      <table class="compare-table">
        <thead>
          <tr>
            <th scope="col">Data</th>
            <th scope="col">${dataA.name}</th>
            <th scope="col">${dataB.name}</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    `;
  }
}

function formatKm(km) {
  return `${km.toLocaleString("id-ID")} km`;
}

function formatMass(kg) {
  if (!kg) return "–";
  const exponent = Math.floor(Math.log10(kg));
  const mantissa = kg / Math.pow(10, exponent);
  const supers = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
  const expStr = String(exponent).split("").map((c) => supers[c] ?? c).join("");
  return `${mantissa.toLocaleString("id-ID", { maximumFractionDigits: 2 })} × 10${expStr} kg`;
}

function formatDistance(data) {
  if (data.kind === "star") return "–";
  return `${(data.distanceFromSunKm / 1000000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} juta km`;
}

function formatOrbitalPeriod(data) {
  if (data.kind === "star") return "–";
  const days = data.orbitalPeriodDays;
  if (days < 500) return `${days.toLocaleString("id-ID")} hari`;
  return `${(days / 365.25).toLocaleString("id-ID", { maximumFractionDigits: 2 })} tahun`;
}

function formatRotation(data) {
  const abs = Math.abs(data.rotationHours);
  const retrograde = data.rotationHours < 0 ? " (retrograde)" : "";
  if (abs < 48) return `${abs.toFixed(1)} jam${retrograde}`;
  return `${(abs / 24).toFixed(1)} hari${retrograde}`;
}

function formatGravity(data) {
  if (data.gravity === undefined) return "–";
  return `${data.gravity} m/s²`;
}

function formatMoons(data) {
  if (data.kind === "star") return "–";
  return `${data.moons}`;
}

function formatTemp(data) {
  if (data.avgTempC === undefined) return "–";
  return `${data.avgTempC.toLocaleString("id-ID")} °C`;
}
