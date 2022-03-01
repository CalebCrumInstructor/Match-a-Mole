// Grab HTML Elements to Use Below
var beginDivEl = document.querySelector("#begin-div");
var timeCapFromEl = document.querySelector("#time-cap-form");
var timeCapInputEl = document.querySelector("#time-cap");
var timeCapLabelEl = document.querySelector("#time-cap-small");
var firstMoleImgEl = document.querySelector("#first-mole");

var timerDivEl = document.querySelector(".timer");
var timeSpanEl = document.querySelector("#time-span");
var tickingTimeSpanEl = document.querySelector("#ticking-time-span");

var matchMeMoleDivEl = document.getElementById("match-me-mole");

var scoreDivEl = document.querySelector(".score");
var containerDivEl = document.querySelector(".container");

var saveFormEl = document.querySelector("#save-form");
var saveInputEl = document.querySelector("#name-input");

var main = document.querySelector("main");


// Declare Global Variables
var timerInterval;
var time = 0;
var timeCap = 10;
var numberOfWhacks = 0;
var moleArrOfObjIndex = 0;

var moleArrOfObj = [
  {
    moleArr: ["./assets/img/goofy_mole.png", "./assets/img/geeky_mole.jpg", "./assets/img/anime_mole.png", "./assets/img/worried_mole.png"],
    matchMeMoleId: 1
  },
  {
    moleArr: ["./assets/img/geeky_mole.jpg", "./assets/img/anime_mole.png", "./assets/img/worried_mole.png", "./assets/img/goofy_mole.png"],
    matchMeMoleId: 1
  },
  {
    moleArr: ["./assets/img/anime_mole.png", "./assets/img/worried_mole.png", "./assets/img/goofy_mole.png", "./assets/img/geeky_mole.jpg"],
    matchMeMoleId: 2
  },
  {
    moleArr: ["./assets/img/worried_mole.png", "./assets/img/goofy_mole.png", "./assets/img/geeky_mole.jpg", "./assets/img/anime_mole.png"],
    matchMeMoleId: 3
  },
  {
    moleArr: ["./assets/img/goofy_mole.png", "./assets/img/geeky_mole.jpg", "./assets/img/anime_mole.png", "./assets/img/worried_mole.png"],
    matchMeMoleId: 1
  },
  {
    moleArr: ["./assets/img/geeky_mole.jpg", "./assets/img/anime_mole.png", "./assets/img/worried_mole.png", "./assets/img/goofy_mole.png"],
    matchMeMoleId: 1
  },
  {
    moleArr: ["./assets/img/anime_mole.png", "./assets/img/worried_mole.png", "./assets/img/goofy_mole.png", "./assets/img/geeky_mole.jpg"],
    matchMeMoleId: 1
  }
]


// Begin Game
timeCapFromEl.addEventListener("submit", init);

function init(event){
  event.preventDefault();
  const givenTimeCap = timeCapInputEl.value;

  if (givenTimeCap < 10 || givenTimeCap > 100) {
    timeCapInputEl.value = "";
    timeCapLabelEl.setAttribute("style", "color: yellow !important");
    return;
  };

  timeCap = givenTimeCap;
  timeSpanEl.textContent = givenTimeCap;

  beginDivEl.setAttribute("style", "display: none !important");
  firstMoleImgEl.setAttribute("style", "display: none !important");
  timerDivEl.setAttribute("style", "display: block !important");
  scoreDivEl.setAttribute("style", "display: block !important");
  containerDivEl.setAttribute("style", "display: block !important");

  timerInterval = setInterval(tickUp, 1000);
  displayMoles();
}


// Display Moles on Screen
function displayMoles() {
  if(moleArrOfObjIndex !== 0){
    matchMeMoleDivEl.children[1].remove();
  }

  var currentMoleLayout = moleArrOfObj[moleArrOfObjIndex];

  var mainImg = document.createElement("img");
  mainImg.classList.add("mole", "h-50");
  mainImg.setAttribute("alt", "mole");
  mainImg.setAttribute("src", currentMoleLayout.moleArr[currentMoleLayout.matchMeMoleId])

  matchMeMoleDivEl.appendChild(mainImg);

  for(var i = 0; i < currentMoleLayout.moleArr.length; i++){
    setMole(i)
  }

}

function setMole(indexVal) {
  var newMoleImg = document.createElement("img");
  newMoleImg.classList.add("mole", "h-50");
  newMoleImg.setAttribute("alt", "mole");
  newMoleImg.setAttribute("src", moleArrOfObj[moleArrOfObjIndex].moleArr[indexVal])

  newMoleImg.addEventListener("click", countMatch);

  var previousImgEl = document.getElementById(indexVal).children[1];

  if (previousImgEl) {
    previousImgEl.remove()
  }

  document.getElementById(indexVal).appendChild(newMoleImg);
}


// Timer
function tickUp(){
  time++;
  tickingTimeSpanEl.textContent = time;

  if (time >= timeCap) {
    end();
  }
}


// Evaluate Clicked on Mole
function countMatch(event) {
  event.stopPropagation();

  if(parseInt(event.target.parentElement.id) === moleArrOfObj[moleArrOfObjIndex].matchMeMoleId) {
    numberOfWhacks++
    scoreDivEl.children[0].textContent = "Score: " + numberOfWhacks;
  }

  moleArrOfObjIndex++
  if(moleArrOfObjIndex === moleArrOfObj.length){
    return end()
  }

  displayMoles()
}


// End Game
function end() {
  clearInterval(timerInterval);

  timerDivEl.setAttribute("style", "display: none !important");
  scoreDivEl.setAttribute("style", "display: none !important");
  containerDivEl.setAttribute("style", "display: none !important");
  saveFormEl.setAttribute("style", "display: block !important");
  main.classList.add("align-items-center");
}


saveFormEl.addEventListener("submit", saveScoreAndMoveUser);


function saveScoreAndMoveUser(event) {
  event.preventDefault();
  
  var name = saveInputEl.value.trim();

  if (name) {
    var localStorageHighScoresForMatches = 
      JSON.parse(window.localStorage.getItem("localStorageHighScoresForMatches")) || [];

    var newEntry = {
      name: name,
      score: numberOfWhacks
    }

    localStorageHighScoresForMatches.push(newEntry);
    
    window.localStorage
      .setItem("localStorageHighScoresForMatches", JSON.stringify(localStorageHighScoresForMatches))

    window.location.href = "highscores.html";
  }

}