/* ===============================
   ELEMENTS
================================ */
const field = document.getElementById("lantern-field");
const wish = document.getElementById("wish");
const final = document.getElementById("final");
const music = document.getElementById("bgMusic");

/* ===============================
   MUSIC (browser rule)
================================ */
document.addEventListener(
  "click",
  () => {
    music.play().catch(() => {});
  },
  { once: true }
);

/* ===============================
   CREATE LANTERN
================================ */
function createLantern(startRandom = false) {
  const lantern = document.createElement("div");

  // depth layers
  const depth = Math.random();
  lantern.className =
    "lantern " + (depth < 0.3 ? "bg" : depth < 0.7 ? "mid" : "fg");

  lantern.style.left = Math.random() * 100 + "vw";

  // start at random height if filling screen
  lantern.style.bottom = startRandom
    ? Math.random() * 100 + "vh"
    : "-160px";

  lantern.style.animationDuration = 16 + Math.random() * 10 + "s";

  lantern.innerHTML = `
    <div class="lantern-top"></div>
    <div class="lantern-body">
      <span class="lantern-text">LINRA</span>
    </div>
    <div class="lantern-bottom"></div>
    <div class="flame"></div>
  `;

  field.appendChild(lantern);

  setTimeout(() => lantern.remove(), 30000);
}

/* ===============================
   PHASE 1 — FILL SCREEN IMMEDIATELY
================================ */
for (let i = 0; i < 50; i++) {
  createLantern(true);
}

/* ===============================
   PHASE 2 — CONTINUOUS FLOW
================================ */
setInterval(() => {
  createLantern();
  createLantern();
  if (Math.random() > 0.35) createLantern();
}, 700);

/* ===============================
   WISH SEQUENCE
================================ */
const wishes = [
  "✨ Happy Birthday Linra ✨",
  "💜 May your dreams glow bright",
  "🏮 May magic light your way",
  "🌟 Happiness always surrounds you",
  "🎂 Have a beautiful year ahead"
];

let wishIndex = 0;

setTimeout(() => {
  const wishTimer = setInterval(() => {
    wish.textContent = wishes[wishIndex];
    wish.style.opacity = 1;
    wishIndex++;

    if (wishIndex === wishes.length) {
      clearInterval(wishTimer);
    }
  }, 2800);
}, 8000);

/* ===============================
   FINAL CINEMATIC REVEAL
================================ */
setTimeout(() => {
  wish.style.opacity = 0;
  final.style.opacity = 1;

  // boost lanterns for celebration
  setInterval(() => {
    createLantern();
    createLantern();
  }, 500);
}, 24000);
