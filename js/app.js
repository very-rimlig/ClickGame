console.log("Hello World!")
//click a button or object so I can earn points so that i can increase my score
//se my current score during the game so that i know how well i am doing
//see a countdown timer so that I know how much time is left
//Variables
let score = 0;

// HTML DOM
const button1 = document.getElementById("button1");

// UI Functions
button1.addEventListener("click",  () => {
  increaseScore();
})

// Functions
function increaseScore() {
  score++;
  console.log(score);
}
