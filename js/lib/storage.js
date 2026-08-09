const KEY = "mathprem:v1";

function today() {
  return new Date().toISOString().slice(0, 10);
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return { ...defaultState(), ...parsed };
  } catch (e) {
    return defaultState();
  }
}

function defaultState() {
  return {
    xp: 0,
    streak: { count: 0, lastDate: null },
    chapters: {},
    games: {},
    party: { name: "" },
  };
}

function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

let state = load();

function persist() {
  save(state);
}

function chapterState(id) {
  if (!state.chapters[id]) {
    state.chapters[id] = {
      practiceBest: null,
      testBest: null,
      testHistory: [],
      flashcardsSeen: [],
      lessonRead: false,
    };
  }
  return state.chapters[id];
}

export const Store = {
  get all() {
    return state;
  },

  addXp(amount) {
    state.xp = Math.max(0, state.xp + amount);
    this.bumpStreak();
    persist();
    return state.xp;
  },

  bumpStreak() {
    const t = today();
    if (state.streak.lastDate === t) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    state.streak.count = state.streak.lastDate === yesterday ? state.streak.count + 1 : 1;
    state.streak.lastDate = t;
    persist();
  },

  markLessonRead(chapterId) {
    chapterState(chapterId).lessonRead = true;
    persist();
  },

  isLessonRead(chapterId) {
    return chapterState(chapterId).lessonRead;
  },

  recordPractice(chapterId, score, total) {
    const cs = chapterState(chapterId);
    if (!cs.practiceBest || score / total > cs.practiceBest.score / cs.practiceBest.total) {
      cs.practiceBest = { score, total, date: today() };
    }
    this.addXp(score * 5);
    persist();
  },

  recordTest(chapterId, score, total, durationSec) {
    const cs = chapterState(chapterId);
    const entry = { score, total, date: today(), durationSec };
    cs.testHistory.push(entry);
    if (!cs.testBest || score / total > cs.testBest.score / cs.testBest.total) {
      cs.testBest = entry;
    }
    this.addXp(score * 10);
    persist();
  },

  markFlashcardSeen(chapterId, cardId) {
    const cs = chapterState(chapterId);
    if (!cs.flashcardsSeen.includes(cardId)) {
      cs.flashcardsSeen.push(cardId);
      persist();
    }
  },

  chapterProgress(chapterId) {
    return chapterState(chapterId);
  },

  recordGame(gameId, patch) {
    state.games[gameId] = { ...state.games[gameId], ...patch };
    persist();
  },

  gameState(gameId) {
    return state.games[gameId] || {};
  },

  setPartyName(name) {
    state.party.name = name;
    persist();
  },

  getPartyName() {
    return state.party.name || "";
  },

  overallStats(chapters) {
    let testsPassed = 0;
    let practiceDone = 0;
    let totalCorrectPct = [];
    chapters.forEach((c) => {
      const cs = state.chapters[c.id];
      if (!cs) return;
      if (cs.testBest) testsPassed++;
      if (cs.practiceBest) {
        practiceDone++;
        totalCorrectPct.push(cs.practiceBest.score / cs.practiceBest.total);
      }
    });
    const avg = totalCorrectPct.length
      ? Math.round((totalCorrectPct.reduce((a, b) => a + b, 0) / totalCorrectPct.length) * 100)
      : 0;
    return { testsPassed, practiceDone, avg, xp: state.xp, streak: state.streak.count };
  },

  reset() {
    state = defaultState();
    persist();
  },
};
