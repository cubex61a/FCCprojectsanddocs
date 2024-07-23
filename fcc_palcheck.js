const palInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const result = document.getElementById('result');

// need three variables that pull from HTML which are text input, the check button, and the result text
// the entire pal checker is done in an arrow function within the addeventlistener button
// const lowerreplaced acts as a regex but used to replace the text to lowercase and numbers without spaces
checkButton.addEventListener("click",() => {
  const lowerreplaced = palInput.value.toLowerCase().replace(/[^a-z0-9]/g,"")
//if and else if statements to determine whether or not input is a palindrome, first is blank, second is if its one letter long, or reversed, if not then not a pal
  if (palInput.value === "") {
    alert("Please input a value")
  } else if (palInput.value.length === 1) {
    result.innerText = `${palInput.value} is a palindrome`
  } else if (lowerreplaced === [...lowerreplaced].reverse().join("")) {
  result.innerText = `${palInput.value} is a palindrome`
  } else {
    result.innerText = `${palInput.value} is not a palindrome`
  }
  });

