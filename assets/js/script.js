var beginButtonEl = document.querySelector("#begin-button");
var firstMoleImgEl = document.querySelector("#first-mole");
var timerDivEl = document.querySelector(".timer");
var scoreDivEl = document.querySelector(".score");
var containerDivEl = document.querySelector(".container");
var saveFormEl = document.querySelector("#save-form");
var saveInputEl = document.querySelector("#name-input")
var saveButtonEl = document.querySelector("#save-button")
var main = document.querySelector("main");

var timerInterval;
var time = 0;
var timeCap = 15;
var numberOfWhacks = 0;
var moleLocationId;
var moleTimeout;
var moleArrofObjIndex = 0;

var moleArrofObj = [
  {
    moleArr: ["./assets/img/goofy_mole.png", "./assets/img/geeky_mole.jpg", "./assets/img/anime_mole.png", "./assets/img/worried_mole.png"],
    matchMeMoleId: 0
  },
  {
    moleArr: ["./assets/img/goofy_mole.png", "./assets/img/geeky_mole.png", "./assets/img/anime_mole.png", "./assets/img/worried_mole.png"],
    matchMeMoleId: 1
  },
  {
    moleArr: ["./assets/img/goofy_mole.png", "./assets/img/geeky_mole.png", "./assets/img/anime_mole.png", "./assets/img/worried_mole.png"],
    matchMeMoleId: 2
  },
  {
    moleArr: ["./assets/img/goofy_mole.png", "./assets/img/geeky_mole.png", "./assets/img/anime_mole.png", "./assets/img/worried_mole.png"],
    matchMeMoleId: 3
  }
]

function displayMoles() {
  var currrentMoleLayout = moleArrofObj[moleArrofObjIndex];

  var mainImg = document.createElement("img");
  mainImg.classList.add("mole");
  mainImg.classList.add("h-50");
  mainImg.setAttribute("alt", "mole");
  mainImg.setAttribute("src", currrentMoleLayout.moleArr[currrentMoleLayout.matchMeMoleId])

  document.getElementById("match-me-mole").appendChild(mainImg);

  for(var i = 0; i < currrentMoleLayout.moleArr.length; i++){
    setMole(i)
  }

  // currrentMoleLayout.matchMeMoleId
}

function setMole(indexVal) {
  var newMoleImg = document.createElement("img");
  newMoleImg.classList.add("mole");
  newMoleImg.classList.add("h-50");
  newMoleImg.setAttribute("alt", "mole");
  newMoleImg.setAttribute("src", moleArrofObj[moleArrofObjIndex].moleArr[indexVal])

  newMoleImg.addEventListener("click", countMatch)

  document.getElementById(indexVal).appendChild(newMoleImg);
}

beginButtonEl.addEventListener("click", begin)

function begin(){
  beginButtonEl.setAttribute("style", "display: none !important");
  firstMoleImgEl.setAttribute("style", "display: none !important");
  timerDivEl.setAttribute("style", "display: block !important");
  scoreDivEl.setAttribute("style", "display: block !important");
  containerDivEl.setAttribute("style", "display: block !important");

  timerInterval = setInterval(tickUp, 1000);
  displayMoles();
}

function tickUp(){
  time++;
  timerDivEl.children[0].textContent = "Timer: " + time;

  if (time >= timeCap) {
    end();
  }
}

// function destroyOldMoleAndCreateNewMole() {
//   if (moleLocationId || moleLocationId === 0){
//     document.getElementById(moleLocationId).children[1].remove();
//   }
//   var newMoleImg = document.createElement("img");
//   newMoleImg.classList.add("mole");
//   newMoleImg.classList.add("h-50");
//   newMoleImg.setAttribute("alt", "mole");
//   newMoleImg.setAttribute("src", "./assets/img/goofy_mole.png")

//   newMoleImg.addEventListener("click", countWhack)

//   moleLocationId = randomLocationGenerator();
//   document.getElementById(moleLocationId).appendChild(newMoleImg);
// }

function countMatch() {
  event.stopPropagation();
  console.log(event.target.parentElement.id);
  console.log(moleArrofObj[moleArrofObjIndex].matchMeMoleId)
  if(event.target.parentElement.id === moleArrofObj[moleArrofObjIndex].matchMeMoleId) {
    console.log("match")
  }

  numberOfWhacks++
  scoreDivEl.children[0].textContent = "Score: " + numberOfWhacks;
}


function randomLocationGenerator() {
  var randomLocation = Math.floor(Math.random()*9);
  if(randomLocation !== moleLocationId){
    return randomLocation
  }else{
    return randomLocationGenerator()
  }
}


function end() {
  clearInterval(timerInterval)
  timerDivEl.setAttribute("style", "display: none !important");
  scoreDivEl.setAttribute("style", "display: none !important");
  containerDivEl.setAttribute("style", "display: none !important");
  saveFormEl.setAttribute("style", "display: block !important");
  main.classList.add("align-items-center");
}


saveButtonEl.addEventListener("click", saveScoreAndMoveUser);


function saveScoreAndMoveUser() {
  event.preventDefault();
  
  var name = saveInputEl.value.trim();

  if (name !== "") {
    var localStorageHighScores = JSON.parse(window.localStorage.getItem("localStorageHighScores")) || [];

    var newEntry = {
      name: name,
      score: numberOfWhacks
    }

    localStorageHighScores.push(newEntry);
    window.localStorage.setItem("localStorageHighScores", JSON.stringify(localStorageHighScores))

    window.location.href = "highscores.html";
  }

}




// Not Ready

// function setMoleTimeout() {
//   moleTimeout = setTimeout(destroyOldMoleAndCreateNewMole, 2000);
// }

// if(moleTimeout){
  //   console.log("moleTimeout")
  //   clearTimeout(moleTimeout)
  // }else{
  //   console.log("moleTimeout2")
  // }
  // moleTimeout = setTimeout(destroyOldMoleAndCreateNewMole, 2000);