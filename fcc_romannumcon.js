const numberInput = document.getElementById("number");
const output = document.getElementById("output");
const convertBtn = document.getElementById("convert-btn");

const numToRom = (numberInput) => {
  var roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };
  var str = '';

  for (var i of Object.keys(roman)) {
    var q = Math.floor(numberInput / roman[i]);
    numberInput -= q * roman[i];
    str += i.repeat(q);
  }

  return str;
}

const checkUserInput = () => {
  const  inputInt = parseInt(number.value);

  if (numberInput.value === "") {
       output.innerText = "Please enter a valid number"
} else if (inputInt < 0) {
      output.innerText = "Please enter a number greater than or equal to 1"
} else if (inputInt > 3999) {
      output.innerText = "Please enter a number less than or equal to 3999"
} else {
      output.textContent = numToRom(inputInt);
      numberInput.value = "";
}
}


convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});