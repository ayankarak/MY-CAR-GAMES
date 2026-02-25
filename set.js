let roadLines = [];
let speed = 5;

function createRoadLines() {
    for (let i = 0; i < 10; i++) {
        let line = document.createElement("div");
        line.classList.add("roadLine");
        line.style.top = (i * 100) + "px";
        gameArea.appendChild(line);
        roadLines.push(line);
    }
}

function moveRoadLines() {
    roadLines.forEach(function(line) {
        let currentTop = parseInt(line.style.top);
        currentTop += speed;

        if (currentTop > 700) {
            currentTop = -100;
        }

        line.style.top = currentTop + "px";
    });
}

function gameLoop() {
    moveRoadLines();
    requestAnimationFrame(gameLoop);
}

createRoadLines();
gameLoop();