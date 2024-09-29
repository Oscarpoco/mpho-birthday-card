const openBoxBtn = document.getElementById("openBoxBtn");
const balloonBox = document.getElementById("balloonBox");
const birthdaySong = document.getElementById("birthdaySong");

openBoxBtn.addEventListener("click", () => {
    balloonBox.classList.remove("hidden");
    birthdaySong.play();
    startConfetti();
});

// Confetti code
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");
let confettiArray = [];

function startConfetti() {
    for (let i = 0; i < 200; i++) {
        confettiArray.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            size: Math.random() * 5 + 2,
            speed: Math.random() * 5 + 2,
            direction: Math.random() * 2 * Math.PI
        });
    }
    requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiArray.forEach(confetti => {
        confetti.x += Math.cos(confetti.direction) * confetti.speed;
        confetti.y += Math.sin(confetti.direction) * confetti.speed;
        ctx.fillStyle = confetti.color;
        ctx.fillRect(confetti.x, confetti.y, confetti.size, confetti.size);
        if (confetti.x < 0 || confetti.x > confettiCanvas.width || confetti.y > confettiCanvas.height) {
            confetti.x = Math.random() * confettiCanvas.width;
            confetti.y = -confetti.size;
        }
    });
    requestAnimationFrame(updateConfetti);
}

// Adjust canvas size to screen size
function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
