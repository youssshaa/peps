import { CHAPTERS } from "../data/chapters.js";
import { Store } from "../lib/storage.js";
import { pct, progressBar } from "../lib/ui.js";

export function progresView() {
  const view = document.getElementById("view");
  const stats = Store.overallStats(CHAPTERS);

  view.innerHTML = `
  <section class="container section">
    <h1>Ma progression</h1>
    <p class="page-sub">Tout est enregistré localement dans ton navigateur : personne d'autre n'y a accès.</p>

    <div class="stats-row">
      <div class="stat-tile"><span class="stat-tile-value">${stats.xp}</span><span class="stat-tile-label">Points XP</span></div>
      <div class="stat-tile"><span class="stat-tile-value">${stats.testsPassed}/12</span><span class="stat-tile-label">Tests passés</span></div>
      <div class="stat-tile"><span class="stat-tile-value">${stats.practiceDone}/12</span><span class="stat-tile-label">Chapitres entraînés</span></div>
      <div class="stat-tile"><span class="stat-tile-value">${stats.avg}%</span><span class="stat-tile-label">Moyenne d'entraînement</span></div>
      <div class="stat-tile"><span class="stat-tile-value">🔥 ${stats.streak}</span><span class="stat-tile-label">Jours de suite</span></div>
    </div>

    <h2 class="section-subtitle">Détail par chapitre</h2>
    <div class="progress-table">
      ${CHAPTERS.map(chapterRow).join("")}
    </div>

    <div class="danger-zone">
      <button class="btn btn-ghost" id="reset-progress">Réinitialiser ma progression</button>
    </div>
  </section>
  `;

  document.getElementById("reset-progress").addEventListener("click", () => {
    if (confirm("Réinitialiser toute ta progression (XP, quiz, tests) ? Cette action est irréversible.")) {
      Store.reset();
      location.reload();
    }
  });
}

function chapterRow(c) {
  const p = Store.chapterProgress(c.id);
  const testPct = p.testBest ? pct(p.testBest.score, p.testBest.total) : 0;
  const practicePct = p.practiceBest ? pct(p.practiceBest.score, p.practiceBest.total) : 0;
  return `
  <a class="progress-row" href="#/chapitre/${c.id}">
    <span class="progress-row-title">${c.icone} ${c.numero}. ${c.titre}</span>
    <span class="progress-row-bars">
      <span class="progress-row-label">Entraînement</span>
      ${progressBar(practicePct, { small: true })}
      <span class="progress-row-pct">${p.practiceBest ? practicePct + "%" : "—"}</span>
    </span>
    <span class="progress-row-bars">
      <span class="progress-row-label">Test</span>
      ${progressBar(testPct, { small: true })}
      <span class="progress-row-pct">${p.testBest ? testPct + "%" : "—"}</span>
    </span>
  </a>`;
}

