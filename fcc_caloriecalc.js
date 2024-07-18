const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

// \d is shorthand for any digit, i is used to make it case-insensitive so it can find e or E
//match() will return an array of match results-containing first or all matches if global flag used
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

//in targetInputContainer the querySelector argument has a template literal ``, variables that are inserted go inside of ${}, no need for concatenation, just put together
//querySelectorAll returns NodeList of all elements that match selector, array-like, can use []
//Remember that you will need to use single quotes for your string, so that you can use double quotes within. 'input[type="text"]'
//length + 1 so that entry starts at 1 because index always starts at 0
//bottom line of function used to be insertHTML but when you put one entry and add another it removes previous data, use insertAdjacentHTML() to preserve data
/*The first argument is a string that specifies the position of the inserted element. The second argument is a string containing the HTML to be inserted.
For the first argument, pass the string "beforeend" to insert the new element as the last child of targetInputContainer.
For the second argument, pass your HTMLString variable.*/
function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

//This function will be another event listener, so the first argument passed will be the browser event – e is a common name for this parameter.
//#breakfast input[type=number] will return any number inputs that are in the #breakfast element.
/*You also need to get the value of your #budget input. You already queried this at the top of your code, and set it to the budgetNumberInput variable. 
However, you used getElementById, which returns an Element, not a NodeList.
For your getCaloriesFromInputs function, an array will work for the argument just as well as a NodeList does. budget line*/
/*Your getCaloriesFromInputs function will set the global error flag to true if an invalid input is detected. 
Add an if statement to your calculateCalories function that checks the truthiness of your global error flag, and if it is truthy then use return to end the function execution.*/
function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
  const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
  const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
  const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
  const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  /*Then use a ternary operator to set surplusOrDeficit to the string "Surplus" or "Deficit" 
  depending on whether remainingCalories is less than 0. If it is less than 0, then surplusOrDeficit should be "Surplus". Otherwise, it should be "Deficit".*/
  //Math.abs is used to make sure when the value for remainingCalories is negative to indicate Deficit, the number isnt actually negative but absolute value
  /*Finally, you need to make the #output element visible so the user can see your text. Your output variable is an Element, which has a classList property. 
  This property has a .remove() method, which accepts a string representing the class to remove from the element.*/
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove('hide');
}

//Remember that you wrote a function earlier to clean the user's input? You'll need to use that function here. cleaninputstring
/*Number("123"); // returns the number 123
Number("123") === 123; // true */
function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}
/* However, the Array object has a .from() method that accepts an array-like and returns an array. 
This is helpful when you want access to more robust array methods, which you will learn about in a future project. */
//After your loop completes, you need to clear the budgetNumberInput. Set the value property of budgetNumberInput to an empty string.
//You also need to clear the output element's text. You can do this by setting the innerText property to an empty string.
//To finish off this function, you need to restore the hide class to the output element
function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  for (const container of inputContainers) {
    container.innerHTML = '';
  }

  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
}

/*The addEventListener method takes two arguments. The first is the event to listen to. (Ex. 'click') 
The second is the callback function, or the function that runs when the event is triggered.
Call the .addEventListener() method on the addEntryButton. Pass in the string "click" for the first argument and the addEntry function for the second argument.*/
addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);
