import { getChapter } from "../data/chapters.js";
import { Store } from "../lib/storage.js";
import { mountQuiz, pickRandomQuestions } from "../lib/quizEngine.js";
import { toast } from "../lib/ui.js";
import { navigate, renderMath } from "../lib/router.js";

export function chapterView({ params, query }) {
  const chapter = getChapter(params.id);
  const view = document.getElementById("view");
  if (!chapter) {
    view.innerHTML = `<div class="container section"><p>Chapitre introuvable. <a href="#/chapitres">Retour aux chapitres</a></p></div>`;
    return;
  }

  const tab = query.tab || "cours";

  if (tab === "quiz") {
    mountPracticeQuiz(view, chapter);
    return;
  }
  if (tab === "test") {
    mountTest(view, chapter);
    return;
  }

  view.innerHTML = renderChapterShell(chapter, tab);
  if (tab === "cours") {
    Store.markLessonRead(chapter.id);
  }
  renderMath(view);
}

function tabsNav(chapter, active) {
  const tabs = [
    { id: "cours", label: "📘 Cours" },
    { id: "fiche", label: "🗂️ Fiche formules" },
    { id: "quiz", label: "✅ Quiz d'entraînement" },
    { id: "test", label: "⏱️ Test chronométré" },
  ];
  return `<div class="chapter-tabs">
    ${tabs
      .map(
        (t) =>
          `<a class="chapter-tab ${t.id === active ? "active" : ""}" href="#/chapitre/${chapter.id}${t.id === "cours" ? "" : `?tab=${t.id}`}">${t.label}</a>`
      )
      .join("")}
  </div>`;
}

function renderChapterShell(chapter, tab) {
  const progress = Store.chapterProgress(chapter.id);
  const header = `
    <div class="chapter-header">
      <a href="#/chapitres" class="btn-back" aria-label="Retour">&larr;</a>
      <div>
        <p class="chapter-eyebrow">${chapter.domaine} &middot; Chapitre ${chapter.numero}</p>
        <h1>${chapter.icone} ${chapter.titre}</h1>
      </div>
    </div>
    ${tabsNav(chapter, tab)}
  `;

  if (tab === "fiche") {
    return `<section class="container section chapter-page">
      ${header}
      <div class="formule-list">
        ${chapter.formules
          .map(
            (f) => `<div class="formule-card">
              <p class="formule-terme">${f.terme}</p>
              <p class="formule-expr">$${f.expr}$</p>
            </div>`
          )
          .join("")}
      </div>
    </section>`;
  }

  return `<section class="container section chapter-page">
    ${header}
    <div class="objectifs-box">
      <p class="objectifs-title">Au programme de ce chapitre :</p>
      <ul>${chapter.objectifs.map((o) => `<li>${o}</li>`).join("")}</ul>
    </div>
    <div class="cours-content">
      ${chapter.sections
        .map(
          (s, i) => `<article class="cours-section">
            <h2>${i + 1}. ${s.titre}</h2>
            ${s.html}
          </article>`
        )
        .join("")}
    </div>
    <div class="chapter-cta">
      <p>Cours terminé ? Passe à l'entraînement.</p>
      <div class="chapter-cta-actions">
        <a class="btn btn-secondary" href="#/chapitre/${chapter.id}?tab=quiz">Faire le quiz</a>
        <a class="btn btn-primary" href="#/chapitre/${chapter.id}?tab=test">Passer le test (${progress.testBest ? "refaire" : "chronométré"})</a>
      </div>
    </div>
  </section>`;
}

function mountPracticeQuiz(view, chapter) {
  view.innerHTML = `<div class="container section quiz-container"></div>`;
  const holder = view.querySelector(".quiz-container");
  const questions = pickRandomQuestions(chapter.quiz, Math.min(6, chapter.quiz.length));
  mountQuiz(holder, {
    questions,
    mode: "practice",
    title: `Quiz &middot; ${chapter.titre}`,
    timed: false,
    onFinish: ({ score, total }) => {
      Store.recordPractice(chapter.id, score, total);
      toast(`Entraînement enregistré : ${score}/${total} (+${score * 5} XP)`, { type: "success" });
    },
    onExit: () => navigate(`/chapitre/${chapter.id}`),
  });
}

function mountTest(view, chapter) {
  view.innerHTML = `<div class="container section quiz-container"></div>`;
  const holder = view.querySelector(".quiz-container");
  const start = Date.now();
  mountQuiz(holder, {
    questions: chapter.quiz,
    mode: "test",
    title: `Test &middot; ${chapter.titre}`,
    timed: true,
    onFinish: ({ score, total }) => {
      const durationSec = Math.round((Date.now() - start) / 1000);
      Store.recordTest(chapter.id, score, total, durationSec);
      toast(`Test terminé : ${score}/${total} (+${score * 10} XP)`, { type: "success" });
    },
    onExit: () => navigate(`/chapitre/${chapter.id}`),
  });
}
