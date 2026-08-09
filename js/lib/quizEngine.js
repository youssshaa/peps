import { shuffle, pct, scoreEmoji, renderMathIn } from "./ui.js";

const DEFAULT_TIME_PER_QUESTION = 45;

function normalizeQuestion(q) {
  if (q.type === "vf") {
    return { ...q, choices: ["Vrai", "Faux"], correctIndex: q.correct ? 0 : 1 };
  }
  if (q.type === "qcm") {
    const order = shuffle(q.choices.map((_, i) => i));
    const choices = order.map((i) => q.choices[i]);
    const correctIndex = order.indexOf(q.correct);
    return { ...q, choices, correctIndex };
  }
  return q;
}

function isCorrectAnswer(q, given) {
  if (q.type === "num") {
    if (given === null || given === undefined || given === "") return false;
    const val = parseFloat(String(given).replace(",", "."));
    if (Number.isNaN(val)) return false;
    const tol = q.tol ?? 0.01;
    return Math.abs(val - q.correct) <= tol;
  }
  return given === q.correctIndex;
}

export function mountQuiz(container, opts) {
  const {
    questions: rawQuestions,
    mode = "practice",
    title = "Quiz",
    onFinish = () => {},
    onExit = null,
    timed = mode === "test",
    timePerQuestion = DEFAULT_TIME_PER_QUESTION,
    onProgress = null,
  } = opts;

  const TIME_PER_QUESTION = timePerQuestion;
  const questions = rawQuestions.map(normalizeQuestion);
  let index = 0;
  let score = 0;
  const answers = [];
  let timerId = null;
  let timeLeft = TIME_PER_QUESTION;
  let locked = false;

  function stopTimer() {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }

  function startTimer() {
    if (!timed) return;
    timeLeft = TIME_PER_QUESTION;
    stopTimer();
    timerId = setInterval(() => {
      timeLeft--;
      const bar = container.querySelector(".q-timer-fill");
      const label = container.querySelector(".q-timer-label");
      if (bar) bar.style.width = `${(timeLeft / TIME_PER_QUESTION) * 100}%`;
      if (label) label.textContent = `${timeLeft}s`;
      if (timeLeft <= 0) {
        stopTimer();
        submitAnswer(null);
      }
    }, 1000);
  }

  function renderQuestion() {
    locked = false;
    const q = questions[index];
    const progressPct = Math.round((index / questions.length) * 100);

    let bodyHtml = "";
    if (q.type === "num") {
      bodyHtml = `
        <div class="q-numeric">
          <input type="text" inputmode="decimal" class="q-num-input" placeholder="Ta réponse..." autocomplete="off" />
          <button class="btn btn-primary q-validate">Valider</button>
        </div>`;
    } else {
      bodyHtml = `<div class="q-choices">
        ${q.choices
          .map(
            (c, i) =>
              `<button class="q-choice" data-index="${i}"><span class="q-choice-letter">${String.fromCharCode(65 + i)}</span><span class="q-choice-text">${c}</span></button>`
          )
          .join("")}
      </div>`;
    }

    container.innerHTML = `
      <div class="quiz-wrap">
        <div class="quiz-head">
          <button class="btn-back" id="quiz-exit" aria-label="Quitter">&larr;</button>
          <div class="quiz-title">${title}</div>
          <div class="quiz-count">${index + 1} / ${questions.length}</div>
        </div>
        <div class="progress-bar quiz-progress"><div class="progress-fill" style="width:${progressPct}%"></div></div>
        ${
          timed
            ? `<div class="q-timer"><div class="q-timer-fill" style="width:100%"></div><span class="q-timer-label">${TIME_PER_QUESTION}s</span></div>`
            : ""
        }
        <div class="q-card">
          <p class="q-question">${q.q}</p>
          ${bodyHtml}
          <div class="q-feedback" hidden></div>
        </div>
        <div class="q-actions">
          <button class="btn btn-primary q-next" hidden>Suivant</button>
        </div>
      </div>
    `;

    document.getElementById("quiz-exit").addEventListener("click", () => {
      stopTimer();
      if (onExit) onExit();
    });

    if (q.type === "num") {
      const input = container.querySelector(".q-num-input");
      const btn = container.querySelector(".q-validate");
      input.focus();
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") submitAnswer(input.value);
      });
      btn.addEventListener("click", () => submitAnswer(input.value));
    } else {
      container.querySelectorAll(".q-choice").forEach((btn) => {
        btn.addEventListener("click", () => submitAnswer(Number(btn.dataset.index)));
      });
    }

    container.querySelector(".q-next").addEventListener("click", next);
    startTimer();
  }

  function submitAnswer(given) {
    if (locked) return;
    locked = true;
    stopTimer();
    const q = questions[index];
    const correct = isCorrectAnswer(q, given);
    if (correct) score++;
    answers.push({ question: q, given, correct });
    if (onProgress) onProgress({ score, index, total: questions.length, correct });

    if (q.type === "num") {
      const input = container.querySelector(".q-num-input");
      const btn = container.querySelector(".q-validate");
      if (input) input.disabled = true;
      if (btn) btn.disabled = true;
      if (input) input.classList.add(correct ? "input-correct" : "input-incorrect");
    } else {
      container.querySelectorAll(".q-choice").forEach((btn) => {
        btn.disabled = true;
        const i = Number(btn.dataset.index);
        if (i === q.correctIndex) btn.classList.add("choice-correct");
        else if (i === given) btn.classList.add("choice-incorrect");
      });
    }

    if (mode === "practice") {
      const fb = container.querySelector(".q-feedback");
      fb.hidden = false;
      fb.className = "q-feedback " + (correct ? "feedback-correct" : "feedback-incorrect");
      const answerLine =
        q.type === "num"
          ? `<p class="q-correct-answer">Réponse attendue : <strong>${q.correct}</strong></p>`
          : given === q.correctIndex
          ? ""
          : `<p class="q-correct-answer">Bonne réponse : <strong>${q.choices[q.correctIndex]}</strong></p>`;
      fb.innerHTML = `<p class="q-verdict">${correct ? "✅ Correct !" : "❌ Pas tout à fait."}</p>${answerLine}<p class="q-explication">${q.expl || ""}</p>`;
      renderMathIn(fb);
    }

    container.querySelector(".q-next").hidden = false;
    container.querySelector(".q-next").textContent = index === questions.length - 1 ? "Voir les résultats" : "Suivant";
    if (mode === "test") {
      next();
    }
  }

  function next() {
    index++;
    if (index >= questions.length) {
      finish();
    } else {
      renderQuestion();
      renderMathIn(container);
    }
  }

  function finish() {
    stopTimer();
    onFinish({ score, total: questions.length, answers });
    renderResults();
  }

  function renderResults() {
    const percent = pct(score, questions.length);
    container.innerHTML = `
      <div class="quiz-wrap quiz-results">
        <div class="results-emoji">${scoreEmoji(percent)}</div>
        <h2>${score} / ${questions.length}</h2>
        <p class="results-pct">${percent}% de bonnes réponses</p>
        <div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div>
        <div class="results-actions">
          <button class="btn btn-secondary" id="q-review-btn">Revoir mes réponses</button>
          <button class="btn btn-primary" id="q-restart-btn">Rejouer</button>
        </div>
        <div class="review-list" id="q-review-list" hidden></div>
      </div>
    `;
    container.querySelector("#q-restart-btn").addEventListener("click", () => {
      index = 0;
      score = 0;
      answers.length = 0;
      renderQuestion();
    });
    container.querySelector("#q-review-btn").addEventListener("click", (e) => {
      const list = container.querySelector("#q-review-list");
      const btn = e.currentTarget;
      list.hidden = !list.hidden;
      btn.textContent = list.hidden ? "Revoir mes réponses" : "Masquer la correction";
      if (!list.hidden && !list.dataset.filled) {
        list.dataset.filled = "1";
        list.innerHTML = answers
          .map((a, i) => {
            const q = a.question;
            const givenLabel =
              q.type === "num"
                ? a.given ?? "(sans réponse)"
                : a.given === null || a.given === undefined
                ? "(sans réponse)"
                : q.choices[a.given];
            const correctLabel = q.type === "num" ? q.correct : q.choices[q.correctIndex];
            return `<div class="review-item ${a.correct ? "review-correct" : "review-incorrect"}">
              <p class="review-q">${i + 1}. ${q.q}</p>
              <p class="review-a">Ta réponse : <strong>${givenLabel}</strong>${a.correct ? "" : ` — Bonne réponse : <strong>${correctLabel}</strong>`}</p>
              <p class="review-expl">${q.expl || ""}</p>
            </div>`;
          })
          .join("");
        renderMathIn(list);
      }
    });
    renderMathIn(container);
  }

  renderQuestion();

  return {
    destroy: stopTimer,
  };
}

export function pickRandomQuestions(pool, n) {
  return shuffle(pool).slice(0, n);
}
