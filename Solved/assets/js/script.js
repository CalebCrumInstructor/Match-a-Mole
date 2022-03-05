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

var mainDivEl = document.querySelector("main");


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


// ! STEP ONE

// TODO: Add a submit event listener to the timeCapFormEl and pass it the init function
timeCapFromEl.addEventListener("submit", init);

// TODO: Complete the Init Function
function init(event){
  // TODO: Prevent the default browser action (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
  event.preventDefault();


  // TODO: Create convenience variable, named givenTimeCap, and set it equal to the value of the time cap input element  
  const givenTimeCap = timeCapInputEl.value;


  // TODO: Check to see if the givenTimeCap is less than 10 or greater than 100
  // TODO (cont.) If this is the case, set the time cap input element value to an empty string and set it's associated label's color to yellow, 
  // TODO (cont.) then return to prevent the rest of the function from running.  
  if (givenTimeCap < 10 || givenTimeCap > 100) {
    timeCapInputEl.value = "";
    timeCapLabelEl.setAttribute("style", "color: yellow !important");
    return;
  };


  // TODO: Set the timeCap variable and the timeSpanEl equal to givenTimeCap
  timeCap = givenTimeCap;
  timeSpanEl.textContent = givenTimeCap;


  // TODO: Set beginDivEl and firstMoleImgEl display to none
  // ! HINT: You may need to use the !important css property
  beginDivEl.setAttribute("style", "display: none !important");
  firstMoleImgEl.setAttribute("style", "display: none !important");


  // TODO: Set timerDivEl, scoreDiveEl, and containerDivEl to display block
  // ! HINT: You may need to use the !important css property
  timerDivEl.setAttribute("style", "display: block !important");
  scoreDivEl.setAttribute("style", "display: block !important");
  containerDivEl.setAttribute("style", "display: block !important");

  // TODO: Use the timerInterval global variable and set an interval that calls the tickUp function every 1 second
  timerInterval = setInterval(tickUp, 1000);


  // TODO: call displayMoles
  displayMoles();
}


// TODO: Complete the displayMoles Function
function displayMoles() {
  // Remove the previous Img El, already finished
  if(moleArrOfObjIndex !== 0){
    matchMeMoleDivEl.children[1].remove();
  }

  // TODO: create a local convenience variable named currentMoleLayout and set it equal to moleArrOfObj at index moleArrOfObjIndex
  var currentMoleLayout = moleArrOfObj[moleArrOfObjIndex];


  // TODO: Create an img element named mainImgEl.  Add the classes mole and h-50, then set the alt attribute to "mole".
  // TODO (cont.) Set the src attribute to currentMoleLayout.moleArr[currentMoleLayout.matchMeMoleId] 
  // TODO (cont.) Append the mainImgEl to the matchMeMoleDivEl
  var mainImg = document.createElement("img");
  mainImg.classList.add("mole", "h-50");
  mainImg.setAttribute("alt", "mole");
  mainImg.setAttribute("src", currentMoleLayout.moleArr[currentMoleLayout.matchMeMoleId])
  matchMeMoleDivEl.appendChild(mainImg);


  // for loop that iterates over the currentMoleLayout.moleArr and calls the setMole function with the argument of i, already finished
  for(var i = 0; i < currentMoleLayout.moleArr.length; i++){
    setMole(i)
  }

}


// TODO: Complete the setMole Function
function setMole(indexVal) {
  // TODO: Create an img element named newMoleImgEl.  Add the classes mole and h-50, then set the alt attribute to "mole".
  // TODO (cont.) Set the src attribute to moleArrOfObj[moleArrOfObjIndex].moleArr[indexVal]
  // TODO (cont.) Append the newMoleImgEl to the matchMeMoleDivEl
  var newMoleImg = document.createElement("img");
  newMoleImg.classList.add("mole", "h-50");
  newMoleImg.setAttribute("alt", "mole");
  newMoleImg.setAttribute("src", moleArrOfObj[moleArrOfObjIndex].moleArr[indexVal])


  // TODO: Add a click listner to newMoleImgEl that calls the countMatch Function
  newMoleImg.addEventListener("click", countMatch);


  // Remove the previous Image Element, already finished
  var previousImgEl = document.getElementById(indexVal).children[1];

  if (previousImgEl) {
    previousImgEl.remove()
  }

  // Append the newMoleImgEl, already finished
  document.getElementById(indexVal).appendChild(newMoleImg);
}


// ! STEP TWO

// TODO: Complete the tickUp Function
function tickUp(){
  // TODO: increase the global variable time by 1 
  time++;


  // TODO: set the tickingTimeSpanEl text content to time
  tickingTimeSpanEl.textContent = time;


  // TODO: if time is greater than or equal to timeCap call the end function
  if (time >= timeCap) {
    end();
  }
}


// TODO: Complete the countMatch Function
function countMatch(event) {
  // TODO: Stop propagation (https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)
  event.stopPropagation();


  // TODO: If the index data value of the event targets parent element is equal to moleArrOfObj[moleArrOfObjIndex].matchMeMoleId
  // TODO (cont.) increase the value of numberOfWhacks by 1 and set the text content of the o 0 index child of scoreDivEl equal to "Score: " + numberOfWhacks
  if(parseInt(event.target.parentElement.dataset.index) === moleArrOfObj[moleArrOfObjIndex].matchMeMoleId) {
    numberOfWhacks++
    scoreDivEl.children[0].textContent = "Score: " + numberOfWhacks;
  }


  // TODO: Increase the moleArrOfObjIndex by 1
  moleArrOfObjIndex++


  // TODO: if moleArrOfObjIndex is equal to the length of moleArrOfObj, then return the end function
  if(moleArrOfObjIndex === moleArrOfObj.length){
    return end()
  }


  // TODO: call displayMoles
  displayMoles()
}


// TODO: Complete end function
function end() {
  // TODO: clear the timerInterval
  clearInterval(timerInterval);


  // TODO: Set timerDivEl, scoreDivEl, and containerDivEl to display none
  // ! HINT: You may need to use the !important css property
  timerDivEl.setAttribute("style", "display: none !important");
  scoreDivEl.setAttribute("style", "display: none !important");
  containerDivEl.setAttribute("style", "display: none !important");


  // TODO: Set saveFormEl to display block
  // ! HINT: You may need to use the !important css property
  saveFormEl.setAttribute("style", "display: block !important");


  // Add align-items-center to mainDivEl, already finished
  mainDivEl.classList.add("align-items-center");
}


// ! STEP THREE

// TODO: Add a submit event listener to the saveFormEl and pass it the saveScoreAndMoveUser function
saveFormEl.addEventListener("submit", saveScoreAndMoveUser);


// TODO: Complete the saveScoreAndMoveUser function
function saveScoreAndMoveUser(event) {
  // TODO: Prevent the default browser action (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
  event.preventDefault();
  

  // TODO: Create a local variable called inputName and set it equal to the trimmed value of saveInputEl
  var inputName = saveInputEl.value.trim();


  // TODO: If the inputName is falsy return to stop the function
  if (!inputName) return;


  // TODO: Create a local variable named localStorageHighScores
  // TODO (cont.) set this variable equal to the parsed value of localStorageHighScores from local storage
  // TODO (cont.) if this value does not exist, set localStorageHighScores equal to an empty array
  var localStorageHighScores = 
    JSON.parse(localStorage.getItem("localStorageHighScores")) || [];


  // TODO: Create a variable newEntry and set it equal to an Object with two key value pairs
  // TODO (cont.) The first key should be called name and it's value should be inputName
  // TODO (cont.) The second key should be called score and it's value should be numberOfWhacks
  var newEntry = {
    name: inputName,
    score: numberOfWhacks
  }


  // TODO: Push newEntry into localStorageHighScores
  localStorageHighScores.push(newEntry);
  

  // TODO: Set localStorageHighScores into local storage with the key name of "localStorageHighScores" 
  localStorage
    .setItem("localStorageHighScores", JSON.stringify(localStorageHighScores))


  // TODO: Redirect the user to "highscores.html"
  location.href = "highscores.html";

}