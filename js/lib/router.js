import { renderMathIn } from "./ui.js";

const routes = [];
let notFoundHandler = () => `<div class="container"><p>Page introuvable.</p></div>`;

export function route(pattern, handler) {
  const paramNames = [];
  const regex = new RegExp(
    "^" +
      pattern.replace(/:[a-zA-Z]+/g, (m) => {
        paramNames.push(m.slice(1));
        return "([^/]+)";
      }) +
      "$"
  );
  routes.push({ regex, paramNames, handler });
}

export function notFound(handler) {
  notFoundHandler = handler;
}

export function navigate(path) {
  location.hash = path;
}

async function render() {
  const view = document.getElementById("view");
  const hash = location.hash.replace(/^#/, "") || "/";
  const [path] = hash.split("?");
  const search = hash.includes("?") ? hash.split("?")[1] : "";
  const query = Object.fromEntries(new URLSearchParams(search));

  for (const r of routes) {
    const match = path.match(r.regex);
    if (match) {
      const params = {};
      r.paramNames.forEach((name, i) => (params[name] = decodeURIComponent(match[i + 1])));
      view.innerHTML = "";
      view.scrollTop = 0;
      const result = await r.handler({ params, query });
      if (typeof result === "string") view.innerHTML = result;
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
      highlightNav(path);
      renderMathIn(view);
      view.focus();
      return;
    }
  }
  view.innerHTML = await notFoundHandler();
}

function highlightNav(path) {
  const seg = path.split("/")[1] || "";
  document.querySelectorAll("#main-nav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.route === seg);
  });
}

export const renderMath = renderMathIn;

export function startRouter() {
  window.addEventListener("hashchange", render);
  window.addEventListener("DOMContentLoaded", render);
  if (document.readyState !== "loading") render();
}
