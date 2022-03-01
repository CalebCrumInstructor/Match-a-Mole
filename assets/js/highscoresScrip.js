var highScoresOlEl = document.querySelector("#highscores-ol");

function displayHighScores() {

  var localStorageHighScoresForMatches = JSON.parse(window.localStorage.getItem("localStorageHighScoresForMatches")) || [];

  const sortedScores = localStorageHighScoresForMatches.sort(sortHighToLow);

  for(var i = 0; i < sortedScores.length; i++) {
    var liEl = document.createElement("li");
    liEl.textContent = sortedScores[i].name + ": " + sortedScores[i].score + " Matches";
    liEl.classList.add("text-light", "h4");
    highScoresOlEl.appendChild(liEl);
  }

};

function sortHighToLow (storageObj1, storageObj2) {
  return storageObj2.score - storageObj1.score;
}

displayHighScores();