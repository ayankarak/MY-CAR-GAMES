const gameArea = document.querySelector(".gameArea");
const player = document.querySelector(".car");
const scoreDisplay = document.getElementById("score");
let gameRunning = false;
const startBtn = document.getElementById("startBtn");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const playAgainBtn = document.getElementById("playAgainBtn");
const startScreen = document.querySelector(".startScreen");
startScreen.classList.remove("hide");

const laneWidth = 100;
const totalLanes = 5;
const carWidth = 60;
const carHeight = 80;
let gameHeight = gameArea.clientHeight;

let currentLane = 2;
let carBottom = 15;

let enemies = [];
let enemySpeed = 5;

let lanes = document.querySelectorAll(".lane");
let laneOffset = 0;
let laneSpeed = 5;

let score = 0;
let difficultyLevel = 1;

const enemyImages = [
    "assets/yellowcar.png",
    "assets/bluecar.png",
    "assets/greencar.png"
];
/* Player Image */
player.style.backgroundImage = "url('assets/car.png')";

/* Player Movement */
function updateCarPosition() {
    let newLeft = currentLane * laneWidth + (laneWidth - carWidth) / 2;
    player.style.left = newLeft + "px";
    player.style.bottom = carBottom + "px";
}

document.addEventListener("keydown", function (e) {

    if (e.key === "ArrowLeft" && currentLane > 0) {
        currentLane--;
    }

    if (e.key === "ArrowRight" && currentLane < totalLanes - 1) {
        currentLane++;
    }

    if (e.key === "ArrowUp" && carBottom < gameHeight - carHeight - 10) {
        carBottom += 20;
    }

    if (e.key === "ArrowDown" && carBottom > 0) {
        carBottom -= 20;
    }

    updateCarPosition();
});


function moveLanes() {
    laneOffset += laneSpeed;

    lanes.forEach(function (lane) {
        lane.style.backgroundPositionY = laneOffset + "px";
    });
}

/* Create Enemy */
function createEnemy() {
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");

    let randomLane = Math.floor(Math.random() * totalLanes);
    let leftPos = randomLane * laneWidth + (laneWidth - carWidth) / 2;

    let randomImage = enemyImages[Math.floor(Math.random() * enemyImages.length)];

    enemy.style.backgroundImage = `url('${randomImage}')`;
    enemy.style.left = leftPos + "px";
    enemy.style.top = "-150px";

    gameArea.appendChild(enemy);
    enemies.push(enemy);
}

/* Move Enemy */
function moveEnemies() {
    enemies.forEach(function (enemy) {
        let currentTop = parseInt(enemy.style.top);
        currentTop += enemySpeed;

        if (isCollide(player, enemy)) {
            gameRunning = false;

            finalScore.innerText = score;
            gameOverScreen.style.display = "flex";
        }

        if (currentTop > gameHeight) {

            let randomLane = Math.floor(Math.random() * totalLanes);
            let leftPos = randomLane * laneWidth + (laneWidth - carWidth) / 2;

            let randomImage = enemyImages[Math.floor(Math.random() * enemyImages.length)];

            enemy.style.backgroundImage = `url('${randomImage}')`;
            enemy.style.left = leftPos + "px";

            currentTop = -150;
            score += 10;
            scoreDisplay.innerText = score;
            if (score % 100 === 0&&enemySpeed<20) {
                difficultyLevel++;
                enemySpeed += 0.75;
                laneSpeed += 0.6;
            }
        }

        enemy.style.top = currentTop + "px";
    });
}

/* Collision */
function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
}

/* Game Loop */
function gameLoop() {
    if (!gameRunning) return;
    moveLanes();
    moveEnemies();
    requestAnimationFrame(gameLoop);
}
startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);

function startGame() {

    startScreen.style.display = "none";
    gameOverScreen.style.display = "none";

    currentLane = Math.floor(totalLanes / 2); 
    carBottom = 15;
    updateCarPosition();

    score = 0;
    scoreDisplay.innerText = score;

    enemies.forEach(e => e.remove());
    enemies = [];

    createEnemy();
    createEnemy();
    createEnemy();

    gameRunning = true;
    gameLoop();
}

/* INIT */
// updateCarPosition();
// createEnemy();
// createEnemy();
// createEnemy();
// gameLoop();