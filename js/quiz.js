import { CELESTIAL_DATA, PLANET_ORDER } from "./planets.js";
import { QUIZ_QUESTIONS } from "./quizData.js";

const OBJECT_ORDER = ["sun", ...PLANET_ORDER];
const OPTION_LETTERS = ["A", "B", "C", "D"];

export class QuizController {
  constructor() {
    this.$overlay = document.getElementById("quiz-overlay");
    this.$body = document.getElementById("quiz-body");
    this.$btnOpen = document.getElementById("btn-quiz-open");
    this.$btnClose = document.getElementById("btn-quiz-close");

    this.selectedIds = new Set();
    this.step = "select";
    this.queue = [];
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;

    this.$btnOpen.addEventListener("click", () => this.open());
    this.$btnClose.addEventListener("click", () => this.close());
    this.$overlay.addEventListener("click", (e) => {
      if (e.target === this.$overlay) this.close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.$overlay.hidden) this.close();
    });

    this._renderSelectStep();
  }

  open() {
    this.$overlay.hidden = false;
  }

  close() {
    this.$overlay.hidden = true;
  }

  _renderSelectStep() {
    this.step = "select";

    const itemsHtml = OBJECT_ORDER.map((id) => {
      const data = CELESTIAL_DATA[id];
      const checked = this.selectedIds.has(id) ? "checked" : "";
      return `
        <label class="quiz-object-item">
          <input type="checkbox" data-quiz-object="${id}" ${checked} />
          <span class="quiz-object-dot" style="background:${data.baseColorHex}"></span>
          ${data.name}
        </label>
      `;
    }).join("");

    const allChecked = this.selectedIds.size === OBJECT_ORDER.length;

    this.$body.innerHTML = `
      <p class="quiz-intro-text">
        Pilih satu atau beberapa objek yang ingin diujikan. Setiap objek punya 5 soal pilihan ganda.
      </p>
      <label class="quiz-select-all">
        <input type="checkbox" id="quiz-select-all" ${allChecked ? "checked" : ""} />
        Pilih Semua
      </label>
      <div class="quiz-object-list">${itemsHtml}</div>
      <button class="quiz-primary-btn" id="quiz-start-btn" ${this.selectedIds.size === 0 ? "disabled" : ""}>
        Mulai Kuis${this.selectedIds.size > 0 ? ` (${this.selectedIds.size * 5} soal)` : ""}
      </button>
    `;

    const $selectAll = document.getElementById("quiz-select-all");
    const $startBtn = document.getElementById("quiz-start-btn");

    this.$body.querySelectorAll("[data-quiz-object]").forEach(($cb) => {
      $cb.addEventListener("change", () => {
        const id = $cb.dataset.quizObject;
        if ($cb.checked) this.selectedIds.add(id);
        else this.selectedIds.delete(id);
        $selectAll.checked = this.selectedIds.size === OBJECT_ORDER.length;
        $startBtn.disabled = this.selectedIds.size === 0;
        $startBtn.textContent = `Mulai Kuis${this.selectedIds.size > 0 ? ` (${this.selectedIds.size * 5} soal)` : ""}`;
      });
    });

    $selectAll.addEventListener("change", () => {
      if ($selectAll.checked) {
        OBJECT_ORDER.forEach((id) => this.selectedIds.add(id));
      } else {
        this.selectedIds.clear();
      }
      this._renderSelectStep();
    });

    $startBtn.addEventListener("click", () => this._startQuiz());
  }

  _startQuiz() {
    this.queue = [];
    OBJECT_ORDER.forEach((id) => {
      if (!this.selectedIds.has(id)) return;
      const questions = QUIZ_QUESTIONS[id] || [];
      questions.forEach((q) => this.queue.push({ objectId: id, ...q }));
    });

    this.currentIndex = 0;
    this.score = 0;
    this.step = "playing";
    this._renderQuestionStep();
  }

  _renderQuestionStep() {
    this.answered = false;
    const item = this.queue[this.currentIndex];
    const objectData = CELESTIAL_DATA[item.objectId];
    const total = this.queue.length;
    const progressPercent = ((this.currentIndex) / total) * 100;

    const optionsHtml = item.options
      .map(
        (opt, i) => `
        <button class="quiz-option" data-option-index="${i}" type="button">
          <span class="quiz-option__letter">${OPTION_LETTERS[i]}</span>
          <span>${opt}</span>
        </button>
      `
      )
      .join("");

    this.$body.innerHTML = `
      <div class="quiz-progress">
        <span>Soal ${this.currentIndex + 1} dari ${total}</span>
        <span>Skor: ${this.score}</span>
      </div>
      <div class="quiz-progress-bar"><div class="quiz-progress-bar__fill" style="width:${progressPercent}%"></div></div>
      <div class="quiz-question-object">${objectData.name}</div>
      <div class="quiz-question-text">${item.question}</div>
      <div id="quiz-options">${optionsHtml}</div>
      <div id="quiz-feedback-area"></div>
      <button class="quiz-quit-btn" id="quiz-quit-btn" type="button">Akhiri Kuis</button>
    `;

    document.getElementById("quiz-quit-btn").addEventListener("click", () => {
      this._confirmQuit();
    });

    this.$body.querySelectorAll(".quiz-option").forEach(($btn) => {
      $btn.addEventListener("click", () => {
        if (this.answered) return;
        this._handleAnswer(parseInt($btn.dataset.optionIndex, 10));
      });
    });
  }

  _confirmQuit() {
    const ok = window.confirm("Akhiri kuis sekarang? Progres soal yang sedang berjalan akan hilang.");
    if (!ok) return;
    this._renderSelectStep();
  }

  _handleAnswer(selectedIndex) {
    this.answered = true;
    const item = this.queue[this.currentIndex];
    const isCorrect = selectedIndex === item.correctIndex;
    if (isCorrect) this.score += 1;

    this.$body.querySelectorAll(".quiz-option").forEach(($btn) => {
      const idx = parseInt($btn.dataset.optionIndex, 10);
      $btn.disabled = true;
      if (idx === item.correctIndex) $btn.classList.add("is-correct");
      else if (idx === selectedIndex) $btn.classList.add("is-wrong");
    });

    const isLast = this.currentIndex === this.queue.length - 1;
    const $feedbackArea = document.getElementById("quiz-feedback-area");
    $feedbackArea.innerHTML = `
      <div class="quiz-feedback ${isCorrect ? "is-correct" : "is-wrong"}">
        <span class="quiz-feedback__label">${isCorrect ? "Benar!" : "Kurang tepat."}</span>
        ${item.explanation}
      </div>
      <button class="quiz-primary-btn" id="quiz-next-btn" type="button">
        ${isLast ? "Lihat Hasil" : "Soal Berikutnya"}
      </button>
    `;

    document.getElementById("quiz-next-btn").addEventListener("click", () => {
      if (isLast) {
        this.step = "result";
        this._renderResultStep();
      } else {
        this.currentIndex += 1;
        this._renderQuestionStep();
      }
    });

    this.$body.querySelector(".quiz-progress span:last-child").textContent = `Skor: ${this.score}`;
  }

  _renderResultStep() {
    const total = this.queue.length;
    const percent = Math.round((this.score / total) * 100);

    let message;
    if (percent === 100) message = "Sempurna! Kamu benar-benar menguasai materi ini.";
    else if (percent >= 70) message = "Bagus! Pemahamanmu sudah cukup kuat.";
    else if (percent >= 40) message = "Lumayan — coba pelajari lagi info planetnya, lalu ulangi kuis.";
    else message = "Yuk jelajahi lagi info planetnya, lalu coba kuisnya sekali lagi.";

    this.$body.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result__score">${this.score} / ${total}</div>
        <p class="quiz-result__label">${message}</p>
        <button class="quiz-primary-btn" id="quiz-retry-btn" type="button">Ulangi Kuis</button>
        <button class="quiz-secondary-btn" id="quiz-close-btn" type="button">Tutup</button>
      </div>
    `;

    document.getElementById("quiz-retry-btn").addEventListener("click", () => {
      this._renderSelectStep();
    });
    document.getElementById("quiz-close-btn").addEventListener("click", () => this.close());
  }
}
