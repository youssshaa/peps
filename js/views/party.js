import { CHAPTERS, allQuizQuestions, getChapter } from "../data/chapters.js";
import { pick, toast, renderMathIn } from "../lib/ui.js";
import { navigate } from "../lib/router.js";

export function partyHubView() {
  return `
  <section class="container section">
    <h1>Quiz en groupe façon Kahoot</h1>
    <p class="page-sub">Deux façons de jouer à plusieurs, en classe ou entre amis.</p>
    <div class="party-modes">
      <a class="party-mode-card" href="#/party/buzzer">
        <span class="game-icon">📺</span>
        <h3>Mode Buzzer (1 écran)</h3>
        <p>Sur un seul appareil ou vidéoprojecteur : les équipes s'affrontent au buzzer. Fonctionne toujours, sans réseau.</p>
        <span class="badge badge-new">Recommandé</span>
      </a>
      <a class="party-mode-card" href="#/party/online">
        <span class="game-icon">📡</span>
        <h3>Mode en ligne (bêta)</h3>
        <p>Chaque joueur répond depuis son téléphone, comme sur Kahoot. Nécessite une bonne connexion Wi-Fi.</p>
        <span class="badge badge-practice">Bêta</span>
      </a>
    </div>
  </section>
  `;
}

const TEAM_COLORS = ["#5b6bf5", "#e0577b", "#2fb88a", "#f2a93b", "#8b5cf6", "#22a6c9"];

// ================= BUZZER MODE =================

export function buzzerView() {
  const view = document.getElementById("view");
  renderSetup();

  function renderSetup() {
    view.innerHTML = `
    <div class="container section party-setup">
      <a href="#/party" class="btn-back" aria-label="Retour">&larr;</a>
      <h1>📺 Mode Buzzer</h1>
      <p class="page-sub">Un seul écran, plusieurs équipes. Idéal en classe avec un vidéoprojecteur.</p>

      <label class="field-label">Équipes (2 à 6)</label>
      <div id="team-inputs" class="team-inputs"></div>
      <button class="btn btn-ghost" id="add-team" type="button">+ Ajouter une équipe</button>

      <label class="field-label">Chapitre</label>
      <select id="buzzer-chapter" class="select-filter">
        <option value="all">Tous les chapitres (mix)</option>
        ${CHAPTERS.map((c) => `<option value="${c.id}">${c.icone} ${c.titre}</option>`).join("")}
      </select>

      <label class="field-label">Nombre de questions</label>
      <select id="buzzer-count" class="select-filter">
        <option value="8">8 questions</option>
        <option value="10" selected>10 questions</option>
        <option value="15">15 questions</option>
      </select>

      <button class="btn btn-primary btn-lg" id="buzzer-start" type="button">Démarrer la partie</button>
    </div>`;

    const teamInputs = document.getElementById("team-inputs");
    function addTeamInput(name) {
      const n = teamInputs.children.length;
      if (n >= 6) return;
      const row = document.createElement("div");
      row.className = "team-input-row";
      row.innerHTML = `<span class="team-color-dot" style="background:${TEAM_COLORS[n]}"></span>
        <input type="text" class="team-name-input" value="${name || `Équipe ${n + 1}`}" maxlength="20" />
        ${n >= 2 ? `<button type="button" class="team-remove" aria-label="Supprimer">✕</button>` : ""}`;
      teamInputs.appendChild(row);
      if (n >= 2) {
        row.querySelector(".team-remove").addEventListener("click", () => row.remove());
      }
    }
    addTeamInput("Équipe 1");
    addTeamInput("Équipe 2");

    document.getElementById("add-team").addEventListener("click", () => addTeamInput());

    document.getElementById("buzzer-start").addEventListener("click", () => {
      const names = [...teamInputs.querySelectorAll(".team-name-input")].map((i) => i.value.trim() || "Équipe");
      if (names.length < 2) {
        toast("Il faut au moins 2 équipes.", { type: "error" });
        return;
      }
      const chapterId = document.getElementById("buzzer-chapter").value;
      const count = Number(document.getElementById("buzzer-count").value);
      const pool = chapterId === "all" ? allQuizQuestions() : getChapter(chapterId).quiz.map((q) => ({ ...q, chapterId }));
      const questions = pick(pool, Math.min(count, pool.length));
      const teams = names.map((name, i) => ({ name, color: TEAM_COLORS[i], score: 0 }));
      startGame(teams, questions);
    });
  }

  function startGame(teams, questions) {
    let qIndex = 0;
    let out = new Set();
    let phase = "buzz";
    let activeTeam = null;

    function normalize(q) {
      if (q.type === "vf") return { ...q, choices: ["Vrai", "Faux"], correctIndex: q.correct ? 0 : 1 };
      if (q.type === "qcm") return { ...q, correctIndex: q.correct };
      return q;
    }

    function renderRound() {
      const q = normalize(questions[qIndex]);
      const isNum = q.type === "num";
      view.innerHTML = `
      <div class="container section buzzer-game">
        <div class="buzzer-scoreboard">
          ${teams.map((t) => `<div class="buzzer-score-chip" style="border-color:${t.color}"><span>${t.name}</span><strong>${t.score}</strong></div>`).join("")}
        </div>
        <p class="quiz-count">Question ${qIndex + 1} / ${questions.length}</p>
        <div class="q-card buzzer-card">
          <p class="q-question">${q.q}</p>
          ${
            isNum
              ? `<p class="buzzer-hint">Réponse numérique — dites votre réponse à voix haute une fois le buzzer pressé.</p>`
              : `<div class="q-choices" id="buzzer-choices">
                ${q.choices.map((c, i) => `<button class="q-choice" data-index="${i}" disabled><span class="q-choice-letter">${String.fromCharCode(65 + i)}</span><span class="q-choice-text">${c}</span></button>`).join("")}
              </div>`
          }
          <div class="buzzer-status" id="buzzer-status">${phase === "buzz" ? "🔔 Premier(e) à buzzer !" : ""}</div>
        </div>
        <div class="buzzer-row" id="buzzer-row">
          ${teams
            .map(
              (t, i) =>
                `<button class="buzzer-btn" data-team="${i}" style="background:${t.color}" ${out.has(i) ? "disabled" : ""}>${t.name}</button>`
            )
            .join("")}
        </div>
      </div>`;
      renderMathIn(view);

      view.querySelectorAll(".buzzer-btn").forEach((btn) => {
        btn.addEventListener("click", () => onBuzz(Number(btn.dataset.team)));
      });
    }

    function refreshScoreboard() {
      const board = view.querySelector(".buzzer-scoreboard");
      if (!board) return;
      board.innerHTML = teams
        .map((t) => `<div class="buzzer-score-chip" style="border-color:${t.color}"><span>${t.name}</span><strong>${t.score}</strong></div>`)
        .join("");
    }

    function onBuzz(teamIndex) {
      if (phase !== "buzz" || out.has(teamIndex)) return;
      phase = "answering";
      activeTeam = teamIndex;
      document.getElementById("buzzer-status").textContent = `🙋 ${teams[teamIndex].name} répond !`;
      document.getElementById("buzzer-row").querySelectorAll(".buzzer-btn").forEach((b) => (b.disabled = true));

      const q = normalize(questions[qIndex]);
      if (q.type === "num") {
        document.getElementById("buzzer-status").innerHTML = `🙋 <strong>${teams[teamIndex].name}</strong> répond à voix haute. L'animateur valide :
          <span class="judge-buttons"><button class="btn btn-primary" id="judge-correct">✅ Correct</button><button class="btn btn-secondary" id="judge-wrong">❌ Faux</button></span>`;
        document.getElementById("judge-correct").addEventListener("click", () => resolveAnswer(true));
        document.getElementById("judge-wrong").addEventListener("click", () => resolveAnswer(false));
      } else {
        view.querySelectorAll("#buzzer-choices .q-choice").forEach((btn) => {
          btn.disabled = false;
          btn.addEventListener("click", () => {
            const chosen = Number(btn.dataset.index);
            resolveAnswer(chosen === q.correctIndex, chosen);
          });
        });
      }
    }

    function resolveAnswer(correct, chosenIndex) {
      const q = normalize(questions[qIndex]);
      if (correct) {
        teams[activeTeam].score += 100;
        refreshScoreboard();
        revealAndAdvance(true, chosenIndex);
      } else {
        out.add(activeTeam);
        if (out.size >= teams.length) {
          revealAndAdvance(false, chosenIndex);
        } else {
          phase = "buzz";
          activeTeam = null;
          renderRound();
        }
      }
    }

    function revealAndAdvance(wasCorrect, chosenIndex) {
      const q = normalize(questions[qIndex]);
      const statusEl = document.getElementById("buzzer-status");
      if (q.type !== "num") {
        view.querySelectorAll("#buzzer-choices .q-choice").forEach((btn) => {
          const i = Number(btn.dataset.index);
          btn.disabled = true;
          if (i === q.correctIndex) btn.classList.add("choice-correct");
          else if (i === chosenIndex) btn.classList.add("choice-incorrect");
        });
      }
      if (statusEl) {
        statusEl.innerHTML = `${wasCorrect ? "✅ Bonne réponse !" : `❌ Personne n'a trouvé. Réponse : <strong>${q.type === "num" ? q.correct : q.choices[q.correctIndex]}</strong>`}<br><span class="q-explication">${q.expl || ""}</span>`;
      }
      renderMathIn(view);
      const nextBtn = document.createElement("button");
      nextBtn.className = "btn btn-primary buzzer-next";
      nextBtn.textContent = qIndex === questions.length - 1 ? "Voir le classement final" : "Question suivante";
      view.querySelector(".buzzer-card").appendChild(nextBtn);
      nextBtn.addEventListener("click", () => {
        qIndex++;
        out = new Set();
        phase = "buzz";
        activeTeam = null;
        if (qIndex >= questions.length) {
          renderFinal();
        } else {
          renderRound();
        }
      });
    }

    function renderFinal() {
      const ranked = [...teams].sort((a, b) => b.score - a.score);
      view.innerHTML = `
      <div class="container section game-end">
        <h2>🏆 Classement final</h2>
        <div class="podium-list">
          ${ranked
            .map(
              (t, i) =>
                `<div class="podium-row" style="border-color:${t.color}"><span class="podium-rank">${["🥇", "🥈", "🥉"][i] || `#${i + 1}`}</span><span class="podium-name">${t.name}</span><span class="podium-score">${t.score} pts</span></div>`
            )
            .join("")}
        </div>
        <div class="results-actions">
          <a class="btn btn-secondary" href="#/party">Retour</a>
          <button class="btn btn-primary" id="buzzer-replay">Nouvelle partie</button>
        </div>
      </div>`;
      document.getElementById("buzzer-replay").addEventListener("click", () => navigate("/party/buzzer"));
    }

    renderRound();
  }
}

// ================= ONLINE MODE (PeerJS) =================

const ROOM_PREFIX = "mathprem-quiz-";
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const QUESTION_TIME_MS = 20000;

function randomCode(len = 4) {
  let s = "";
  for (let i = 0; i < len; i++) s += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  return s;
}

function peerAvailable() {
  return typeof window.Peer !== "undefined";
}

export function partyOnlineHubView() {
  return `
  <section class="container section party-setup">
    <a href="#/party" class="btn-back" aria-label="Retour">&larr;</a>
    <h1>📡 Mode en ligne (bêta)</h1>
    <p class="page-sub">Chaque joueur rejoint depuis son propre téléphone ou ordinateur, comme sur Kahoot. La connexion se fait directement entre appareils (aucune donnée n'est stockée sur un serveur), donc un Wi-Fi correct est recommandé.</p>
    <div class="party-modes">
      <a class="party-mode-card" href="#/party/host">
        <span class="game-icon">🖥️</span>
        <h3>Créer une partie</h3>
        <p>Tu deviens l'hôte : projette l'écran, les autres rejoignent avec le code.</p>
      </a>
      <a class="party-mode-card" href="#/party/join">
        <span class="game-icon">📱</span>
        <h3>Rejoindre une partie</h3>
        <p>Entre le code donné par l'hôte pour jouer depuis ton appareil.</p>
      </a>
    </div>
  </section>
  `;
}

// ---------- HOST ----------

export function partyHostView() {
  const view = document.getElementById("view");
  renderSetup();

  function renderSetup() {
    view.innerHTML = `
    <div class="container section party-setup">
      <a href="#/party/online" class="btn-back" aria-label="Retour">&larr;</a>
      <h1>🖥️ Créer une partie</h1>
      <label class="field-label">Chapitre</label>
      <select id="host-chapter" class="select-filter">
        <option value="all">Tous les chapitres (mix)</option>
        ${CHAPTERS.map((c) => `<option value="${c.id}">${c.icone} ${c.titre}</option>`).join("")}
      </select>
      <label class="field-label">Nombre de questions</label>
      <select id="host-count" class="select-filter">
        <option value="8">8 questions</option>
        <option value="10" selected>10 questions</option>
        <option value="15">15 questions</option>
      </select>
      <button class="btn btn-primary btn-lg" id="host-create">Créer la salle</button>
      <p class="beta-note" id="host-error"></p>
    </div>`;

    document.getElementById("host-create").addEventListener("click", () => {
      if (!peerAvailable()) {
        document.getElementById("host-error").textContent =
          "Impossible de charger la connexion en direct (PeerJS). Vérifie ta connexion internet, ou utilise le mode Buzzer qui fonctionne hors-ligne.";
        return;
      }
      const chapterId = document.getElementById("host-chapter").value;
      const count = Number(document.getElementById("host-count").value);
      const pool = chapterId === "all" ? allQuizQuestions() : getChapter(chapterId).quiz.map((q) => ({ ...q, chapterId }));
      const questions = pick(pool, Math.min(count, pool.length));
      createRoom(questions);
    });
  }

  function createRoom(questions) {
    view.innerHTML = `<div class="container section party-setup"><p>Création de la salle…</p></div>`;
    const code = randomCode();
    const peer = new window.Peer(ROOM_PREFIX + code.toLowerCase());
    const players = new Map(); // connId -> {name, conn, score}

    peer.on("open", () => renderLobby(peer, code, players, questions));
    peer.on("error", (err) => {
      view.innerHTML = `<div class="container section party-setup">
        <p class="beta-note">La création de la salle a échoué (${err.type || "erreur réseau"}). Réessaie, ou utilise le mode Buzzer.</p>
        <a class="btn btn-secondary" href="#/party/host">Réessayer</a>
      </div>`;
    });
  }

  function renderLobby(peer, code, players, questions) {
    view.innerHTML = `
    <div class="container section party-setup lobby-view">
      <h1>Salle créée !</h1>
      <p class="page-sub">Donne ce code aux joueurs :</p>
      <div class="room-code">${code}</div>
      <p class="page-sub">Ils vont sur ce site, onglet <strong>Quiz en groupe → Rejoindre</strong>, et entrent ce code.</p>
      <h2 class="section-subtitle">Joueurs connectés (<span id="player-count">0</span>)</h2>
      <ul class="player-list" id="player-list"></ul>
      <button class="btn btn-primary btn-lg" id="host-start" disabled>En attente de joueurs…</button>
    </div>`;

    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        if (data.type === "join") {
          players.set(conn.peer, { name: data.name || "Joueur", conn, score: 0 });
          conn.send({ type: "joined" });
          refreshPlayerList();
        } else if (data.type === "answer") {
          handleAnswer(conn.peer, data);
        }
      });
      conn.on("close", () => {
        players.delete(conn.peer);
        refreshPlayerList();
      });
    });

    function refreshPlayerList() {
      document.getElementById("player-count").textContent = players.size;
      document.getElementById("player-list").innerHTML = [...players.values()]
        .map((p) => `<li>${p.name}</li>`)
        .join("");
      const startBtn = document.getElementById("host-start");
      startBtn.disabled = players.size === 0;
      startBtn.textContent = players.size === 0 ? "En attente de joueurs…" : `Démarrer avec ${players.size} joueur(s)`;
    }

    let currentAnswers = null;
    function handleAnswer(playerId, data) {
      if (!currentAnswers || currentAnswers.qIndex !== data.qIndex) return;
      if (currentAnswers.received.has(playerId)) return;
      currentAnswers.received.set(playerId, { value: data.value, elapsedMs: Date.now() - currentAnswers.startedAt });
    }

    document.getElementById("host-start").addEventListener("click", () => {
      if (players.size === 0) return;
      runGame(peer, players, questions, (setter) => (currentAnswers = setter));
    });
  }

  function normalize(q) {
    if (q.type === "vf") return { ...q, choices: ["Vrai", "Faux"], correctIndex: q.correct ? 0 : 1 };
    if (q.type === "qcm") return { ...q, correctIndex: q.correct };
    return q;
  }

  function runGame(peer, players, questions, setCurrentAnswers) {
    let qIndex = 0;
    let currentAnswers = { qIndex: -1, startedAt: 0, received: new Map() };
    setCurrentAnswers(currentAnswers);

    function broadcast(msg) {
      players.forEach((p) => p.conn.send(msg));
    }

    function askQuestion() {
      const q = normalize(questions[qIndex]);
      currentAnswers = { qIndex, startedAt: Date.now(), received: new Map() };
      setCurrentAnswers(currentAnswers);

      broadcast({
        type: "question",
        index: qIndex,
        total: questions.length,
        q: { q: q.q, choices: q.choices || null, type: q.type },
        timeLimitMs: QUESTION_TIME_MS,
      });

      view.innerHTML = `
      <div class="container section host-play">
        <p class="quiz-count">Question ${qIndex + 1} / ${questions.length}</p>
        <div class="q-card">
          <p class="q-question">${q.q}</p>
          ${q.choices ? `<div class="q-choices host-choices">${q.choices.map((c, i) => `<div class="q-choice host-choice"><span class="q-choice-letter">${String.fromCharCode(65 + i)}</span><span class="q-choice-text">${c}</span></div>`).join("")}</div>` : ""}
        </div>
        <p class="host-answer-count"><span id="answer-count">0</span> / ${players.size} ont répondu</p>
        <div class="progress-bar"><div class="progress-fill" id="host-timer-fill" style="width:100%"></div></div>
      </div>`;
      renderMathIn(view);

      const totalMs = QUESTION_TIME_MS;
      const startedAt = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startedAt;
        const remain = Math.max(0, totalMs - elapsed);
        const fill = document.getElementById("host-timer-fill");
        if (fill) fill.style.width = `${(remain / totalMs) * 100}%`;
        const countEl = document.getElementById("answer-count");
        if (countEl) countEl.textContent = currentAnswers.received.size;
        if (remain <= 0 || currentAnswers.received.size >= players.size) {
          clearInterval(interval);
          revealResults(q);
        }
      }, 200);
    }

    function revealResults(q) {
      currentAnswers.received.forEach((ans, playerId) => {
        const player = players.get(playerId);
        if (!player) return;
        const correct = q.type === "num" ? isNumCorrect(q, ans.value) : ans.value === q.correctIndex;
        if (correct) {
          const speedBonus = Math.max(0, 1 - ans.elapsedMs / QUESTION_TIME_MS);
          player.score += Math.round(500 + speedBonus * 500);
        }
      });

      const leaderboard = [...players.values()].map((p) => ({ name: p.name, score: p.score })).sort((a, b) => b.score - a.score);
      broadcast({ type: "reveal", correctValue: q.type === "num" ? q.correct : q.correctIndex, leaderboard });

      view.innerHTML = `
      <div class="container section host-play">
        <p class="quiz-count">Correction — Question ${qIndex + 1} / ${questions.length}</p>
        <p class="q-question">${q.q}</p>
        <p class="q-correct-answer">Bonne réponse : <strong>${q.type === "num" ? q.correct : q.choices[q.correctIndex]}</strong></p>
        <p class="q-explication">${q.expl || ""}</p>
        <h2 class="section-subtitle">Classement</h2>
        <div class="podium-list">
          ${leaderboard
            .slice(0, 8)
            .map((p, i) => `<div class="podium-row"><span class="podium-rank">${["🥇", "🥈", "🥉"][i] || `#${i + 1}`}</span><span class="podium-name">${p.name}</span><span class="podium-score">${p.score} pts</span></div>`)
            .join("")}
        </div>
        <button class="btn btn-primary btn-lg" id="host-next">${qIndex === questions.length - 1 ? "Voir le podium final" : "Question suivante"}</button>
      </div>`;
      renderMathIn(view);

      document.getElementById("host-next").addEventListener("click", () => {
        qIndex++;
        if (qIndex >= questions.length) {
          endGame([...players.values()].map((p) => ({ name: p.name, score: p.score })).sort((a, b) => b.score - a.score));
        } else {
          askQuestion();
        }
      });
    }

    function endGame(leaderboard) {
      broadcast({ type: "end", leaderboard });
      view.innerHTML = `
      <div class="container section game-end">
        <h2>🏆 Partie terminée !</h2>
        <div class="podium-list">
          ${leaderboard
            .map((p, i) => `<div class="podium-row"><span class="podium-rank">${["🥇", "🥈", "🥉"][i] || `#${i + 1}`}</span><span class="podium-name">${p.name}</span><span class="podium-score">${p.score} pts</span></div>`)
            .join("")}
        </div>
        <div class="results-actions">
          <a class="btn btn-secondary" href="#/party">Retour</a>
          <button class="btn btn-primary" id="host-replay">Nouvelle partie</button>
        </div>
      </div>`;
      document.getElementById("host-replay").addEventListener("click", () => {
        peer.destroy();
        navigate("/party/host");
      });
    }

    askQuestion();
  }
}

function isNumCorrect(q, given) {
  if (given === null || given === undefined || given === "") return false;
  const val = parseFloat(String(given).replace(",", "."));
  if (Number.isNaN(val)) return false;
  const tol = q.tol ?? 0.01;
  return Math.abs(val - q.correct) <= tol;
}

// ---------- JOIN (player) ----------

export function partyJoinView() {
  const view = document.getElementById("view");
  renderForm();

  function renderForm() {
    view.innerHTML = `
    <div class="container section party-setup">
      <a href="#/party/online" class="btn-back" aria-label="Retour">&larr;</a>
      <h1>📱 Rejoindre une partie</h1>
      <label class="field-label">Code de la salle</label>
      <input type="text" id="join-code" class="team-name-input room-code-input" maxlength="6" placeholder="EX: 7QXK" autocomplete="off" />
      <label class="field-label">Ton pseudo</label>
      <input type="text" id="join-name" class="team-name-input" maxlength="18" placeholder="Ton prénom" autocomplete="off" />
      <button class="btn btn-primary btn-lg" id="join-btn">Rejoindre</button>
      <p class="beta-note" id="join-error"></p>
    </div>`;

    document.getElementById("join-btn").addEventListener("click", () => {
      const code = document.getElementById("join-code").value.trim().toLowerCase();
      const name = document.getElementById("join-name").value.trim() || "Joueur";
      if (!code) {
        document.getElementById("join-error").textContent = "Entre le code donné par l'hôte.";
        return;
      }
      if (!peerAvailable()) {
        document.getElementById("join-error").textContent = "Impossible de charger la connexion en direct. Vérifie ta connexion internet.";
        return;
      }
      connect(code, name);
    });
  }

  function connect(code, name) {
    view.innerHTML = `<div class="container section party-setup"><p>Connexion à la salle ${code.toUpperCase()}…</p></div>`;
    const peer = new window.Peer();
    peer.on("open", () => {
      const conn = peer.connect(ROOM_PREFIX + code, { reliable: true });
      let joined = false;

      const timeout = setTimeout(() => {
        if (!joined) showError("Salle introuvable. Vérifie le code, ou demande à l'hôte de recréer une salle.");
      }, 8000);

      conn.on("open", () => {
        conn.send({ type: "join", name });
      });

      conn.on("data", (data) => {
        if (data.type === "joined") {
          joined = true;
          clearTimeout(timeout);
          renderWaiting();
        } else if (data.type === "question") {
          renderQuestion(conn, data);
        } else if (data.type === "reveal") {
          renderReveal(data);
        } else if (data.type === "end") {
          renderEnd(data);
        }
      });

      conn.on("error", () => showError("La connexion a été interrompue."));
      conn.on("close", () => showError("L'hôte a fermé la salle."));
    });
    peer.on("error", (err) => showError(`Impossible de se connecter (${err.type || "erreur réseau"}).`));
  }

  function showError(message) {
    view.innerHTML = `<div class="container section party-setup">
      <p class="beta-note">${message}</p>
      <a class="btn btn-secondary" href="#/party/join">Réessayer</a>
    </div>`;
  }

  function renderWaiting() {
    view.innerHTML = `<div class="container section party-setup lobby-view">
      <p class="waiting-pulse">🎉 Tu es dans la partie !</p>
      <p class="page-sub">En attente que l'hôte démarre la partie…</p>
    </div>`;
  }

  function renderQuestion(conn, data) {
    let answered = false;
    const isNum = data.q.type === "num";
    view.innerHTML = `
    <div class="container section quiz-container">
      <p class="quiz-count">Question ${data.index + 1} / ${data.total}</p>
      <div class="progress-bar"><div class="progress-fill" id="player-timer-fill" style="width:100%"></div></div>
      <div class="q-card">
        <p class="q-question">${data.q.q}</p>
        ${
          isNum
            ? `<div class="q-numeric"><input type="text" inputmode="decimal" id="player-num-input" class="q-num-input" placeholder="Ta réponse..." autocomplete="off" /><button class="btn btn-primary" id="player-num-submit">Valider</button></div>`
            : `<div class="q-choices">${data.q.choices.map((c, i) => `<button class="q-choice" data-index="${i}"><span class="q-choice-letter">${String.fromCharCode(65 + i)}</span><span class="q-choice-text">${c}</span></button>`).join("")}</div>`
        }
        <p class="q-feedback" id="player-sent" hidden>✅ Réponse envoyée !</p>
      </div>
    </div>`;
    renderMathIn(view);

    function sendAnswer(value) {
      if (answered) return;
      answered = true;
      conn.send({ type: "answer", qIndex: data.index, value });
      document.getElementById("player-sent").hidden = false;
      if (isNum) {
        document.getElementById("player-num-input").disabled = true;
        document.getElementById("player-num-submit").disabled = true;
      } else {
        view.querySelectorAll(".q-choice").forEach((b) => {
          b.disabled = true;
          if (Number(b.dataset.index) === value) b.classList.add("choice-selected");
        });
      }
    }

    if (isNum) {
      const input = document.getElementById("player-num-input");
      input.focus();
      input.addEventListener("keydown", (e) => e.key === "Enter" && sendAnswer(input.value));
      document.getElementById("player-num-submit").addEventListener("click", () => sendAnswer(input.value));
    } else {
      view.querySelectorAll(".q-choice").forEach((btn) => {
        btn.addEventListener("click", () => sendAnswer(Number(btn.dataset.index)));
      });
    }

    const startedAt = Date.now();
    const interval = setInterval(() => {
      const remain = Math.max(0, data.timeLimitMs - (Date.now() - startedAt));
      const fill = document.getElementById("player-timer-fill");
      if (fill) fill.style.width = `${(remain / data.timeLimitMs) * 100}%`;
      if (remain <= 0) {
        clearInterval(interval);
        if (!answered) sendAnswer(isNum ? "" : null);
      }
    }, 200);
  }

  function renderReveal(data) {
    view.innerHTML = `<div class="container section party-setup lobby-view">
      <p class="waiting-pulse">📊 Classement</p>
      <div class="podium-list">
        ${data.leaderboard
          .slice(0, 5)
          .map((p, i) => `<div class="podium-row"><span class="podium-rank">${["🥇", "🥈", "🥉"][i] || `#${i + 1}`}</span><span class="podium-name">${p.name}</span><span class="podium-score">${p.score} pts</span></div>`)
          .join("")}
      </div>
      <p class="page-sub">En attente de la question suivante…</p>
    </div>`;
  }

  function renderEnd(data) {
    view.innerHTML = `<div class="container section game-end">
      <h2>🏁 Partie terminée !</h2>
      <div class="podium-list">
        ${data.leaderboard
          .map((p, i) => `<div class="podium-row"><span class="podium-rank">${["🥇", "🥈", "🥉"][i] || `#${i + 1}`}</span><span class="podium-name">${p.name}</span><span class="podium-score">${p.score} pts</span></div>`)
          .join("")}
      </div>
      <a class="btn btn-primary" href="#/party">Retour</a>
    </div>`;
  }
}
