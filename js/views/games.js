import { CHAPTERS, allFlashcards, allQuizQuestions } from "../data/chapters.js";
import { Store } from "../lib/storage.js";
import { shuffle, pick, toast, formatTime, renderMathIn } from "../lib/ui.js";
import { mountQuiz } from "../lib/quizEngine.js";
import { navigate } from "../lib/router.js";

export function gamesHubView() {
  const flash = Store.gameState("flashcards");
  const chrono = Store.gameState("chrono");
  const memory = Store.gameState("memory");

  return `
  <section class="container section">
    <h1>Jeux de révision</h1>
    <p class="page-sub">Trois façons ludiques de retenir le cours et de rester au top pour les contrôles.</p>
    <div class="games-grid">
      <a class="game-card" href="#/jeux/flashcards">
        <span class="game-icon">🗂️</span>
        <h3>Flashcards</h3>
        <p>Fais défiler les formules à connaître par cœur et évalue-toi.</p>
        <span class="game-score">${flash.seen ? `${flash.seen} cartes vues` : "Nouveau"}</span>
      </a>
      <a class="game-card" href="#/jeux/chrono">
        <span class="game-icon">⚡</span>
        <h3>Chrono Quiz</h3>
        <p>20 questions de tout le programme, 20 secondes chacune. Bats ton record !</p>
        <span class="game-score">${chrono.best ? `Record : ${chrono.best}/20` : "Nouveau"}</span>
      </a>
      <a class="game-card" href="#/jeux/memory">
        <span class="game-icon">🧩</span>
        <h3>Memory des formules</h3>
        <p>Retrouve les paires notion / formule le plus vite possible.</p>
        <span class="game-score">${memory.bestMoves ? `Record : ${memory.bestMoves} coups` : "Nouveau"}</span>
      </a>
    </div>
  </section>
  `;
}

// ---------- Flashcards ----------

export function flashcardsView({ query }) {
  const view = document.getElementById("view");
  const chapterId = query.chapitre || "all";
  const pool = chapterId === "all" ? allFlashcards() : allFlashcards().filter((f) => f.chapterId === chapterId);
  const cards = shuffle(pool);
  let i = 0;
  let known = 0;
  let toReview = 0;

  function renderChapterFilter() {
    return `<select id="flash-chapter-filter" class="select-filter">
      <option value="all" ${chapterId === "all" ? "selected" : ""}>Tous les chapitres</option>
      ${CHAPTERS.map((c) => `<option value="${c.id}" ${chapterId === c.id ? "selected" : ""}>${c.icone} ${c.titre}</option>`).join("")}
    </select>`;
  }

  function renderCard() {
    if (cards.length === 0) {
      view.innerHTML = `<div class="container section"><p>Aucune formule pour ce filtre. <a href="#/jeux/flashcards">Retour</a></p></div>`;
      return;
    }
    if (i >= cards.length) {
      Store.recordGame("flashcards", { seen: (Store.gameState("flashcards").seen || 0) + cards.length });
      view.innerHTML = `
      <div class="container section game-end">
        <h2>Série terminée !</h2>
        <p>✅ ${known} connues &middot; 🔁 ${toReview} à revoir</p>
        <div class="results-actions">
          <a class="btn btn-secondary" href="#/jeux">Retour aux jeux</a>
          <button class="btn btn-primary" id="flash-restart">Recommencer</button>
        </div>
      </div>`;
      document.getElementById("flash-restart").addEventListener("click", () => navigate(`/jeux/flashcards${chapterId !== "all" ? `?chapitre=${chapterId}` : ""}`));
      return;
    }
    const card = cards[i];
    view.innerHTML = `
    <div class="container section flashcards-view">
      <div class="flash-toolbar">
        <a href="#/jeux" class="btn-back" aria-label="Retour">&larr;</a>
        ${renderChapterFilter()}
        <span class="flash-count">${i + 1} / ${cards.length}</span>
      </div>
      <div class="flash-card" id="flash-card">
        <p class="flash-chapter-tag">${card.chapterTitre}</p>
        <p class="flash-term">${card.terme}</p>
        <p class="flash-hint">Clique pour voir la formule</p>
        <div class="flash-back" hidden>
          <p class="flash-formula">$${card.expr}$</p>
        </div>
      </div>
      <div class="flash-actions" id="flash-actions" hidden>
        <button class="btn btn-secondary" id="flash-review">🔁 À revoir</button>
        <button class="btn btn-primary" id="flash-known">✅ Je savais</button>
      </div>
    </div>`;

    document.getElementById("flash-chapter-filter").addEventListener("change", (e) => {
      navigate(`/jeux/flashcards${e.target.value !== "all" ? `?chapitre=${e.target.value}` : ""}`);
    });

    const cardEl = document.getElementById("flash-card");
    cardEl.addEventListener("click", () => {
      cardEl.classList.add("flipped");
      cardEl.querySelector(".flash-back").hidden = false;
      cardEl.querySelector(".flash-hint").hidden = true;
      document.getElementById("flash-actions").hidden = false;
      renderMathIn(cardEl);
    });
    document.getElementById("flash-known").addEventListener("click", (e) => {
      e.stopPropagation();
      known++;
      Store.markFlashcardSeen(card.chapterId, card.id);
      i++;
      renderCard();
    });
    document.getElementById("flash-review").addEventListener("click", (e) => {
      e.stopPropagation();
      toReview++;
      i++;
      renderCard();
    });
  }

  renderCard();
}

// ---------- Chrono quiz ----------

export function chronoView() {
  const view = document.getElementById("view");
  view.innerHTML = `<div class="container section quiz-container"></div>`;
  const holder = view.querySelector(".quiz-container");
  const questions = pick(allQuizQuestions(), 20);
  let streak = 0;
  let bestStreak = 0;

  mountQuiz(holder, {
    questions,
    mode: "test",
    title: "⚡ Chrono Quiz",
    timed: true,
    timePerQuestion: 20,
    onProgress: ({ correct }) => {
      streak = correct ? streak + 1 : 0;
      bestStreak = Math.max(bestStreak, streak);
    },
    onFinish: ({ score, total }) => {
      const prevBest = Store.gameState("chrono").best || 0;
      Store.recordGame("chrono", { best: Math.max(prevBest, score), bestStreak: Math.max(Store.gameState("chrono").bestStreak || 0, bestStreak) });
      Store.addXp(score * 3);
      if (score > prevBest) toast("🎉 Nouveau record au Chrono Quiz !", { type: "success" });
    },
    onExit: () => navigate("/jeux"),
  });
}

// ---------- Memory match ----------

export function memoryView() {
  const view = document.getElementById("view");
  const pairsPool = shuffle(allFlashcards()).slice(0, 6);
  const cards = shuffle(
    pairsPool.flatMap((f) => [
      { pairId: f.id, side: "term", label: f.terme, sub: f.chapterTitre },
      { pairId: f.id, side: "formula", label: `$${f.expr}$`, sub: f.chapterTitre },
    ])
  ).map((c, idx) => ({ ...c, uid: idx }));

  let firstPick = null;
  let lock = false;
  let moves = 0;
  let matched = 0;
  const startTime = Date.now();
  let timerInterval = null;

  function render() {
    view.innerHTML = `
    <div class="container section memory-view">
      <div class="flash-toolbar">
        <a href="#/jeux" class="btn-back" aria-label="Retour">&larr;</a>
        <span>Coups : <strong id="memory-moves">${moves}</strong></span>
        <span>Temps : <strong id="memory-timer">0:00</strong></span>
      </div>
      <div class="memory-grid">
        ${cards
          .map(
            (c) => `<button class="memory-card" data-uid="${c.uid}" data-pair="${c.pairId}">
              <span class="memory-card-inner">
                <span class="memory-face memory-face-back">?</span>
                <span class="memory-face memory-face-front"><span class="memory-sub">${c.sub}</span><span class="memory-label">${c.label}</span></span>
              </span>
            </button>`
          )
          .join("")}
      </div>
    </div>`;
    view.querySelectorAll(".memory-card").forEach((btn) => btn.addEventListener("click", () => onFlip(btn)));
    startTimer();
  }

  function startTimer() {
    stopTimer();
    timerInterval = setInterval(() => {
      const el = document.getElementById("memory-timer");
      if (el) el.textContent = formatTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
  }
  function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
  }

  function onFlip(btn) {
    if (lock || btn.classList.contains("revealed") || btn.classList.contains("solved")) return;
    btn.classList.add("revealed");
    renderMathIn(btn);

    if (!firstPick) {
      firstPick = btn;
      return;
    }
    moves++;
    document.getElementById("memory-moves").textContent = moves;

    if (firstPick.dataset.pair === btn.dataset.pair && firstPick !== btn) {
      firstPick.classList.add("solved");
      btn.classList.add("solved");
      firstPick = null;
      matched++;
      if (matched === pairsPool.length) {
        stopTimer();
        setTimeout(finish, 400);
      }
    } else {
      lock = true;
      const a = firstPick;
      const b = btn;
      firstPick = null;
      setTimeout(() => {
        a.classList.remove("revealed");
        b.classList.remove("revealed");
        lock = false;
      }, 900);
    }
  }

  function finish() {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const prev = Store.gameState("memory");
    const isBest = !prev.bestMoves || moves < prev.bestMoves;
    Store.recordGame("memory", {
      bestMoves: prev.bestMoves ? Math.min(prev.bestMoves, moves) : moves,
      bestTime: prev.bestTime ? Math.min(prev.bestTime, seconds) : seconds,
    });
    Store.addXp(30);
    view.innerHTML = `
    <div class="container section game-end">
      <h2>Bravo ! 🧩</h2>
      <p>${moves} coups en ${formatTime(seconds)}${isBest ? " — nouveau record !" : ""}</p>
      <div class="results-actions">
        <a class="btn btn-secondary" href="#/jeux">Retour aux jeux</a>
        <button class="btn btn-primary" id="memory-restart">Rejouer</button>
      </div>
    </div>`;
    document.getElementById("memory-restart").addEventListener("click", () => navigate("/jeux/memory"));
  }

  render();
}
