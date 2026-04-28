//Varibler
let score = 0;
let timeLeft = 5;
let GameStarted = false;
let GameFinished = false;
let interval = null;

//HTML DOM
const scoreButton = document.getElementById("scoreButton");
const button2 = document.getElementById("button2");
const scoreDisplay = document.getElementById("scoreDisplay");
const timerDisplay = document.getElementById("timerDisplay");
const label1 = document.getElementById("label1");
const inputField = document.getElementById("inputName");

//gör formuläret osynligt
inputField.style.display="none"; //göm input field innan spel slut
label1.style.display="none"; //göm rubrik till input field innan spel slut
button2.style.display="none"; //göm skicka-knappen innan spel slut

//funktioner och events
scoreButton.addEventListener("click", () => {
  if(!GameFinished) {
    if(!GameStarted){
      startGame();
    }
    increaseScore();
  }
});

button2.addEventListener("click", () => {
  submitHighScore();
});

function startGame() {
  GameStarted = true;
  interval = setInterval(countdown, 1000);
}

function increaseScore() {
  score++;
  scoreDisplay.innerText = score;
}

function endGame() {
  GameFinished = true;
  clearInterval(interval);
  const scoreLabel = document.getElementById("scoreLabel");
  scoreLabel.innerText = "Dina poäng blev";
  scoreLabel.style.fontWeight = "bold";

  //visa formulär och slutresultet genom häva tidigare regel
  scoreButton.style.display = "none";
  inputField.style.display = "block";
  label1.style.display="block";
  button2.style.display = "block";
}

function countdown()  {
  timeLeft--;
  timerDisplay.innerText = timeLeft;
  if (timeLeft <= 0) {
    timerDisplay.innerText = 0;
    endGame();
  }
}
//funktionen som skickar namn och poäng till zapier
async function submitHighScore() {
  const playerName = inputField.value.trim();
  if (playerName.length < 2) {
    alert("Ditt alias måste vara minst två tecken");
    return;
  }
  try {
    const response = await fetch("https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        name: playerName,
        score: score
      }),
    });

    alert("Ditt resultat är skickat");
    button2.disabled = true;
    button2.innerText = "Inskickat!";

  } catch (error) {
    console.error("Fel vid anrop:", error);
    alert("Något gick fel");
  }
}
//GET-request för att inhämta scoreboard från google script/sheet
const url = 'https://script.google.com/macros/s/AKfycbys5aEPMvNCutyhNYYCcQcCjzsi2UtqNspmKyCH-AicJxJbCJMrAoT0LUaYaXhTWA8n/exec';

fetch(url)
  .then(response => response.json())
  .then(data => {
    if (Array.isArray(data)) {
      const cleanData = data
        .map(player => {
          const finalName = (player.name && player.name.trim() !== "")
            ? player.name
            : "Anonym spelare";

          const finalScore = Number(player.score);

          return {
            name: finalName,
            score: finalScore
          };
        })
        .filter(player => player.score > 0 && !isNaN(player.score));
      cleanData.sort((a, b) => b.score - a.score);

      const scoreList = document.getElementById("scoreList");
      scoreList.innerHTML = ""; //rensar listan innen den fylls

      cleanData.forEach((player) => {
        const li = document.createElement("li");
        li.innerText = `${player.name}: ${player.score} poäng`;
        scoreList.appendChild(li);
      });
    }
  })
  .catch(error => console.error("Kunde inte ladda listan:", error));
