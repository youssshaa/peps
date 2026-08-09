import { CHAPTERS } from "../data/chapters.js";
import { Store } from "../lib/storage.js";
import { pct } from "../lib/ui.js";

export function homeView() {
  const stats = Store.overallStats(CHAPTERS);
  const nextChapter =
    CHAPTERS.find((c) => !Store.chapterProgress(c.id).testBest) || CHAPTERS[0];

  return `
  <section class="hero">
    <div class="hero-text">
      <p class="hero-kicker">Spécialité Mathématiques &middot; Première</p>
      <h1>Révise tout ton programme de maths de 1ère, chapitre par chapitre.</h1>
      <p class="hero-sub">Cours condensés, quiz auto-corrigés, jeux de révision et quiz en groupe façon Kahoot pour réviser avec ta classe. 100% gratuit, tout reste dans ton navigateur.</p>
      <div class="hero-actions">
        <a class="btn btn-primary btn-lg" href="#/chapitres">Voir les 12 chapitres</a>
        <a class="btn btn-secondary btn-lg" href="#/party">Lancer un quiz en groupe</a>
      </div>
    </div>
    <div class="hero-stats">
      <div class="stat-card">
        <span class="stat-value">${stats.xp}</span>
        <span class="stat-label">points XP</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${stats.testsPassed}/12</span>
        <span class="stat-label">tests réussis</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">🔥 ${stats.streak}</span>
        <span class="stat-label">jour(s) de suite</span>
      </div>
    </div>
  </section>

  <section class="container section">
    <div class="section-head">
      <h2>Reprendre où tu t'es arrêté(e)</h2>
      <a href="#/chapitres" class="link-more">Tous les chapitres →</a>
    </div>
    <a class="continue-card" href="#/chapitre/${nextChapter.id}">
      <span class="continue-icon">${nextChapter.icone}</span>
      <span class="continue-body">
        <span class="continue-title">Chapitre ${nextChapter.numero} &middot; ${nextChapter.titre}</span>
        <span class="continue-desc">${nextChapter.resume}</span>
      </span>
      <span class="continue-arrow">→</span>
    </a>
  </section>

  <section class="container section">
    <div class="section-head">
      <h2>Trois façons de réviser</h2>
    </div>
    <div class="feature-grid">
      <div class="feature-card">
        <span class="feature-icon">📘</span>
        <h3>Fiches de cours</h3>
        <p>Le programme complet résumé clairement, avec exemples et formules, pour chaque chapitre.</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">✅</span>
        <h3>Quiz &amp; tests chronométrés</h3>
        <p>Des quiz d'entraînement corrigés instantanément, et un vrai mode « devoir surveillé » chronométré.</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🎮</span>
        <h3>Jeux &amp; quiz en groupe</h3>
        <p>Flashcards, memory, mode chrono, et un quiz d'équipe façon Kahoot à jouer avec toute la classe.</p>
      </div>
    </div>
  </section>

  <section class="container section domaines-section">
    <div class="section-head">
      <h2>Les domaines du programme</h2>
    </div>
    <div class="domaine-grid">
      ${domaineCards()}
    </div>
  </section>
  `;
}

function domaineCards() {
  const domaines = {};
  CHAPTERS.forEach((c) => {
    domaines[c.domaine] = domaines[c.domaine] || [];
    domaines[c.domaine].push(c);
  });
  return Object.entries(domaines)
    .map(
      ([domaine, chapters]) => `
      <div class="domaine-card">
        <h3>${domaine}</h3>
        <ul>
          ${chapters
            .map(
              (c) =>
                `<li><a href="#/chapitre/${c.id}">${c.icone} ${c.titre} ${
                  Store.chapterProgress(c.id).testBest
                    ? `<span class="mini-badge">${pct(
                        Store.chapterProgress(c.id).testBest.score,
                        Store.chapterProgress(c.id).testBest.total
                      )}%</span>`
                    : ""
                }</a></li>`
            )
            .join("")}
        </ul>
      </div>`
    )
    .join("");
}
