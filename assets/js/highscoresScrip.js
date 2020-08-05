var highScoresOlEl = document.querySelector("#highscores-ol")

function displayHighScores() {

  var localStorageHighScoresForMatches = JSON.parse(window.localStorage.getItem("localStorageHighScoresForMatches")) || [];

  // can add sort()

  for(var i = 0; i < localStorageHighScoresForMatches.length; i++) {
    var liEl = document.createElement("li");
    liEl.textContent = localStorageHighScoresForMatches[i].name + ": " + localStorageHighScoresForMatches[i].score + " Match(es)";
    liEl.classList.add("custom-li-css");
    highScoresOlEl.appendChild(liEl);
  }

}

displayHighScores();