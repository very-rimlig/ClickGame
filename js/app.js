console.log("Hello World!")
//click a button or object so I can earn points so that i can increase my score
//se my current score during the game so that i know how well i am doing
//see a countdown timer so that I know how much time is left - setintervall (function)


//Variables
let score = 0;
let timeLeft = 60;

// HTML DOM
const timerDisplay = document.getElementById("timerDisplay"); // Hämta klockan
const button1 = document.getElementById("button1");
const scoreDisplay = document.getElementById("scoreDisplay");

// UI Functions
button1.addEventListener("click",  () => {
  increaseScore();
})

// Functions
function increaseScore() {
  score++;
  scoreDisplay.innerText = score;
}

function sectimer() {
  const timerId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerId);
      timerDisplay.innerText = "Tiden slut"; // Visa att det är klart
      console.log("Tiden är ute!");
    } else {
      timeLeft--;
      timerDisplay.innerText = timeLeft; // Uppdatera siffran på skärmen
      console.log(`Nedräkning: ${timeLeft}`);
    }
  }, 1000);
}

// Kör funktionen för att starta
sectimer();
