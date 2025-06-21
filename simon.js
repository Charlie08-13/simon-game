window.onload = function () {
  const rulesModal = document.getElementById("rulesModal");
  const startBtn = document.getElementById("startBtn");
  const gameArea = document.getElementById("gameArea");

  // Show rules for 5 seconds, then start button
  setTimeout(() => {
    rulesModal.style.display = "none";
    startBtn.classList.remove("hidden");
  }, 5000);

  // Start game when button clicked
  startBtn.addEventListener("click", () => {
    startBtn.classList.add("hidden");
    gameArea.classList.remove("hidden");

    // Call your actual game start function here
    startSimonGame();
  });

  function startSimonGame() {
    // Placeholder: You'd implement the Simon game logic here
    console.log("Simon Game Started!");
  }
};


let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelup();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randomIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    gameFlash(randBtn);
}

function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key  to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "";
        }, 150);
        resetGame();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAnswer(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
