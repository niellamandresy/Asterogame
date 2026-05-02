//button to begin the game
const beginButton = document.getElementById("begin-button");

beginButton.addEventListener("click", () => {
    window.location.href ='./asterogame.html';
})

//button to show high-scores
const highScores = document.getElementById("high-scores-button");

highScores.addEventListener("click", () => {
    window.location.href ='./high-scores.html';
})