const headline = document.getElementById("headline");
const prompt = document.getElementById("prompt");
const pic = document.getElementById("pic");
const message = document.getElementById("message");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const step4 = document.getElementById("step4");

const foreverYes = document.getElementById("foreverYes");
const foreverNo = document.getElementById("foreverNo");
const valYes = document.getElementById("valYes");
const valNo = document.getElementById("valNo");

const runawayArea = document.getElementById("runawayArea");

const restart = document.getElementById("restart");
const confetti = document.getElementById("confetti");
const song = document.getElementById("song");

const images = {
  s1: "images/bear1.jpg",
  s2: "images/bear2.jpg",
  s3: "images/bear3.jpg",
  win: "images/final.jpg"
};

const ratingResponses = {
  1: "Wow 😭",
  2: "Think again 🤨",
  3: "Try again 😌",
  4: "You're getting there 👀"
};

function showStep(n) {
  step1.classList.toggle("hidden", n !== 1);
  step2.classList.toggle("hidden", n !== 2);
  step3.classList.toggle("hidden", n !== 3);
  step4.classList.toggle("hidden", n !== 4);
}

function setMsg(text) {
  message.textContent = text;
}

function popConfetti() {
  confetti.classList.remove("hidden");
  confetti.innerHTML = "";

  for (let i = 0; i < 120; i++) {
    const s = document.createElement("span");
    s.style.left = Math.random() * 100 + "vw";
    s.style.background = `hsl(${Math.random() * 360},90%,65%)`;
    confetti.appendChild(s);
  }

  setTimeout(() => {
    confetti.classList.add("hidden");
    confetti.innerHTML = "";
  }, 2000);
}

function moveNoButton() {
  const areaRect = runawayArea.getBoundingClientRect();
  const btnRect = valNo.getBoundingClientRect();
  const padding = 10;

  const maxLeft = areaRect.width - btnRect.width - padding;
  const maxTop = areaRect.height - btnRect.height - padding;

  const left = padding + Math.random() * Math.max(0, maxLeft - padding);
  const top = padding + Math.random() * Math.max(0, maxTop - padding);

  valNo.style.left = `${left}px`;
  valNo.style.top = `${top}px`;
  valNo.style.transform = "translate(0,0)";
}

function initNoButtonPosition() {
  valNo.style.left = "60%";
  valNo.style.top = "65%";
  valNo.style.transform = "translate(-50%, -50%)";
}

/* STEP 1 */
document.querySelectorAll(".choice").forEach(btn => {
  btn.addEventListener("click", () => {
    const value = Number(btn.dataset.value);

    if (value === 5) {
      setMsg("");
      pic.src = images.s2;
      prompt.textContent = "Okay good. Next question…";
      showStep(2);
    } else {
      setMsg(ratingResponses[value]);
    }
  });
});

/* STEP 2 */
foreverYes.addEventListener("click", () => {
  setMsg("");
  pic.src = images.s3;
  prompt.textContent = "Final question…";
  showStep(3);
  initNoButtonPosition();
});

foreverNo.addEventListener("click", () => {
  setMsg("Try that again 😌");
});

/* STEP 3 */
valYes.addEventListener("click", () => {
  setMsg("");
  pic.src = images.win;
  showStep(4);
  popConfetti();

  song.currentTime = 0;
  song.play().catch(() => {});
});

function runAway(e) {
  if (e && typeof e.preventDefault === "function") e.preventDefault();
  moveNoButton();
}

valNo.addEventListener("mouseenter", runAway);
valNo.addEventListener("touchstart", runAway, { passive: false });
valNo.addEventListener("pointerdown", runAway);
valNo.addEventListener("focus", runAway);

/* 🔁 RESTART (STOP MUSIC TOO) */
restart.addEventListener("click", () => {
  // 🛑 stop music
  song.pause();
  song.currentTime = 0;

  headline.textContent = "Hi Jas Bear 🐻💖";
  prompt.textContent = "Quick question…";
  pic.src = images.s1;
  setMsg("");
  showStep(1);
  initNoButtonPosition();
});
