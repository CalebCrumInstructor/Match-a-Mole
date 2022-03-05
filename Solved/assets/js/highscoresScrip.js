// ! STEP THREE CONT.

var highScoresOlEl = document.querySelector("#highscores-ol");


// TODO: Complete the displayHighScores function
function displayHighScores() {

  // TODO: Create a local variable named localStorageHighScores
  // TODO (cont.) set this variable equal to the parsed value of localStorageHighScores from local storage
  // TODO (cont.) if this value does not exist, set localStorageHighScores equal to an empty array
  var localStorageHighScores = JSON.parse(localStorage.getItem("localStorageHighScores")) || [];


  // TODO: Sort the localStorageHighScores array and set it equal to a local variable named sortedScores
  // TODO (cont.) Use the sort method (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 
  // TODO (cont.) and the function sortHighToLow to accomplish this task
  const sortedScores = localStorageHighScores.sort(sortHighToLow);


  // TODO: Create a for loop that iterates over the sortedScores Array and creates an liEl for each value
  // TODO (cont.) each liEl should have the name and matches displayed and have the classes of "text-light" and "h4" added
  // TODO (cont.) appended these elements to highScoresOlEl
  for(var i = 0; i < sortedScores.length; i++) {
    var liEl = document.createElement("li");
    liEl.textContent = sortedScores[i].name + ": " + sortedScores[i].score + " Matches";
    liEl.classList.add("text-light", "h4");
    highScoresOlEl.appendChild(liEl);
  }

};


// TODO: Complete the sortHighToLow function
function sortHighToLow (storageObj1, storageObj2) {
  // TODO: return the score value of storageObj2 minus the score value of storageObj1
  return storageObj2.score - storageObj1.score;
}


// TODO: Call displayHighScores
displayHighScores();