import { CHAPTERS } from "../data/chapters.js";
import { Store } from "../lib/storage.js";
import { pct } from "../lib/ui.js";

export function chapitresView() {
  return `
  <section class="container section">
    <h1>Les 12 chapitres du programme</h1>
    <p class="page-sub">Sélectionne un chapitre pour lire le cours, t'entraîner avec un quiz, ou passer le test chronométré.</p>
    <div class="chapters-grid">
      ${CHAPTERS.map(chapterCard).join("")}
    </div>
  </section>
  `;
}

function chapterCard(c) {
  const progress = Store.chapterProgress(c.id);
  const practicePct = progress.practiceBest ? pct(progress.practiceBest.score, progress.practiceBest.total) : null;
  const testPct = progress.testBest ? pct(progress.testBest.score, progress.testBest.total) : null;

  return `
  <a class="chapter-card" href="#/chapitre/${c.id}">
    <div class="chapter-card-top">
      <span class="chapter-icon">${c.icone}</span>
      <span class="chapter-domaine">${c.domaine}</span>
    </div>
    <h3>${c.numero}. ${c.titre}</h3>
    <p class="chapter-resume">${c.resume}</p>
    <div class="chapter-card-footer">
      ${
        testPct !== null
          ? `<span class="badge badge-test">Test : ${testPct}%</span>`
          : practicePct !== null
          ? `<span class="badge badge-practice">Entraînement : ${practicePct}%</span>`
          : `<span class="badge badge-new">À commencer</span>`
      }
    </div>
  </a>`;
}
