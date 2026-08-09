export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pick(arr, n) {
  return shuffle(arr).slice(0, n);
}

export function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

export function pct(score, total) {
  if (!total) return 0;
  return Math.round((score / total) * 100);
}

export function toast(message, opts = {}) {
  const root = document.getElementById("toast-root");
  const el = document.createElement("div");
  el.className = "toast" + (opts.type ? ` toast-${opts.type}` : "");
  el.textContent = message;
  root.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 300);
  }, opts.duration || 2200);
}

export function progressBar(percent, opts = {}) {
  const cls = opts.small ? "progress-bar small" : "progress-bar";
  return `<div class="${cls}"><div class="progress-fill" style="width:${Math.max(0, Math.min(100, percent))}%"></div></div>`;
}

export function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function renderMathIn(scope) {
  if (window.renderMathInElement) {
    window.renderMathInElement(scope, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: false,
    });
  }
}

export function scoreEmoji(percent) {
  if (percent >= 90) return "🏆";
  if (percent >= 70) return "🎉";
  if (percent >= 50) return "👍";
  return "💪";
}
