import { route, startRouter, notFound } from "./lib/router.js";
import { homeView } from "./views/home.js";
import { chapitresView } from "./views/chapitres.js";
import { chapterView } from "./views/chapter.js";
import { progresView } from "./views/progres.js";
import { gamesHubView, flashcardsView, chronoView, memoryView } from "./views/games.js";
import { partyHubView, buzzerView, partyOnlineHubView, partyHostView, partyJoinView } from "./views/party.js";

route("/", homeView);
route("/chapitres", chapitresView);
route("/chapitre/:id", chapterView);

route("/progres", progresView);

route("/jeux", gamesHubView);
route("/jeux/flashcards", flashcardsView);
route("/jeux/chrono", chronoView);
route("/jeux/memory", memoryView);

route("/party", partyHubView);
route("/party/buzzer", buzzerView);
route("/party/online", partyOnlineHubView);
route("/party/host", partyHostView);
route("/party/join", partyJoinView);

notFound(() => `
  <div class="container section" style="text-align:center">
    <h1>404</h1>
    <p>Cette page n'existe pas.</p>
    <a class="btn btn-primary" href="#/">Retour à l'accueil</a>
  </div>
`);

startRouter();

const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");
navToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
window.addEventListener("hashchange", () => {
  mainNav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
});
