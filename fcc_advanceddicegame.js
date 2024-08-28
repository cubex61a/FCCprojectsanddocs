const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let round = 1;
let rolls = 0;

const rollDice = () => {
  diceValuesArr = [];

  for (let i = 0; i < 5; i++) {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    diceValuesArr.push(randomDice);
  };

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
};

/*
You'll need to be able to update your rolls and your round on the page. Create an updateStats 
function to update the text of those two elements with the appropriate values. Then, call that function when your rollDiceBtn is clicked and the dice are rolled.
*/

const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
};

/*
Each time you roll the dice, you could end up with a Three of a kind, Four of a kind, Full house, Straight or a random combination of numbers. Based on the outcome, 
you can make a selection and add points to your score.
Start by creating a function called updateRadioOption that takes an index and a score value as arguments. 
It should set the scoreInputs at that index to be enabled, set the value of that input to the score, and display , score = ${score} in the correct scoreSpans element.
*/

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
};

/*
Create an updateScore function to add this functionality. Your function will need two parameters for the user selected score option. The first parameter will be passed the value of the radio button, 
remember this is a string, and the second parameter will be passed the id value of the radio button, which is the type of score they achieved.
*/

const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue);
  totalScoreElement.textContent = score;

  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};


/*
If a number appears four or more times, you will need to update the Four of a Kind option with your updateRadioOption function. If a number appears three or more times, 
you will need to update the Three of a Kind option. 
In both cases, the score value should be the sum of all five dice.
If neither of those are true, the final option should be updated with a score of 0. Make sure to call your getHighestDuplicates when the dice are rolled.
*/
const getHighestDuplicates = (arr) => {
  const counts = {};

  for (const num of arr) {
    if (counts[num]) {
      counts[num]++;
    } else {
      counts[num] = 1;
    }
  }

  let highestCount = 0;

  for (const num of arr) {
    const count = counts[num];
    if (count >= 3 && count > highestCount) {
      highestCount = count;
    }
    if (count >= 4 && count > highestCount) {
      highestCount = count;
    }
  }

  const sumOfAllDice = arr.reduce((a, b) => a + b, 0);

  if (highestCount >= 4) {
    updateRadioOption(1, sumOfAllDice);
  }

  if (highestCount >= 3) {
    updateRadioOption(0, sumOfAllDice);
  }

  updateRadioOption(5, 0);
};

/*
If the user rolls three of one number, and two of another number, this is called a full house. Declare a detectFullHouse 
function that accepts a single argument. The function will be passed the diceValuesArr array when called.
Your detectFullHouse function should check if the user has rolled three of one number and two of another number. 
If so, it should update the third radio button to display a score of 25, with the correct attributes. 
If not, it should update the last radio button to display a score of 0, with the correct attributes.
*/

const detectFullHouse = (arr) => {
  const counts = {};

  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  const hasThreeOfAKind = Object.values(counts).includes(3);
  const hasPair = Object.values(counts).includes(2);

  if (hasThreeOfAKind && hasPair) {
    updateRadioOption(2, 25);
  }

  updateRadioOption(5, 0);
};

/*
Create a resetRadioOptions function. Your function should iterate through the scoreInputs to disable them and remove the checked attribute. 
Your function should also remove the text from each of the scoreSpans. Finally, call this function before you roll the dice.
*/

const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });

  scoreSpans.forEach((span) => {
    span.textContent = "";
  });
};

/*
Declare a resetGame function to do so. Reset all of the listOfAllDice elements to display 0, update score and rolls to be 0, 
update round to be 1, set the totalScoreElement text to the user's total score, clear the score history by setting it to an empty string, 
set the rollsElement text to the number of rolls, and set the roundElement text to the current round. Finally, reset all of the radio buttons to their initial states.
*/

const resetGame = () => {
  diceValuesArr = [0, 0, 0, 0, 0];
  score = 0;
  round = 1;
  rolls = 0;

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });

  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = "";

  rollsElement.textContent = rolls;
  roundElement.textContent = round;

  resetRadioOptions();
};

/*
For the last portion of the game, you will need to create an algorithm that checks for the presence of a straight. 
A small straight is when four of the dice have consecutive values in any order (Ex. 1234) resulting in a score of 30 points. 
A large straight is when all five dice have consecutive values in any order (Ex. 12345) resulting in a score of 40 points.
Declare a checkForStraights function which accepts an array of numbers. If the user gets a large straight, 
update the fifth radio button with a score of 40. If the user gets a small straight, update the fourth radio button with a score of 30. 
If the user gets no straight, update the last radio button to display 0.
*/

const checkForStraights = (arr) => {
const counts = {};

  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  const keys = Object.keys(counts).join('')

  if (keys === '12345' || keys === "23456") {
    updateRadioOption(4,40);
  }

  if (keys.slice(0,4) === '1234' || keys.slice(0,4) === '2345' ||
      keys.slice(1,5) === '2345' || keys.slice(1,5) === '2345') {
      updateRadioOption(3,30);
      }

      updateRadioOption(5,0);

};

let array = [1,5,4,3,2];
let array2 = [1,5,4,3,6];

checkForStraights(array)
checkForStraights(array2)

/*When the user clicks on the Roll the dice button, five random die numbers should be generated and displayed on the screen.
Build out the logic such that clicking on the rollDiceBtn generates five random numbers between 1 and 6 inclusive, 
sets the diceValuesArr to contain only those five numbers, and displays the numbers in order in the listOfAllDice elements.
If a user clicks the rollDiceBtn but has already made three rolls, the browser should show an alert() to indicate they must select a 
score - otherwise, it should roll the dice as it currently does and increment the rolls variable.
*/

rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("You have made three rolls this round. Please select a score.");
  } else {
    rolls++;
    resetRadioOptions();
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);
    checkForStraights(diceValuesArr);
  }
});

/* When the user clicks on the Show rules button, the rules for the game should display on the screen. When they click on the button again, the rules should be hidden.
Use an event listener to invert the value of the isModalShowing variable, toggle the visibility of the rulesContainer, and change the text of the rulesBtn to Show rules or Hide rules.*/

rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;

  if (isModalShowing) {
    rulesBtn.textContent = "Hide rules";
    rulesContainer.style.display = "block";
  } else {
    rulesBtn.textContent = "Show rules";
    rulesContainer.style.display = "none";
  }
});

keepScoreBtn.addEventListener("click", () => {
  let selectedValue;
  let achieved;

  for (const radioButton of scoreInputs) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      achieved = radioButton.id;
      break;
    }
  }

//After running your logic when the user selects a score, you should check if 6 rounds have been played. If so, display an alert with the user's final score after 500 milliseconds.

  if (selectedValue) {
    rolls = 0;
    round++;
    updateStats();
    resetRadioOptions();
    updateScore(selectedValue, achieved);
    if (round > 6) {
      setTimeout(() => {
        alert(`Game Over! Your total score is ${score}`);
        resetGame();
      }, 500);
    }
  } else {
    alert("Please select an option or roll the dice");
  }
});