const userInput = document.getElementById("user-input");
const result = document.getElementById("results-div");
const check = document.getElementById("check-btn");
const clear = document.getElementById("clear-btn");

check.addEventListener("click", () => {
const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;

if (!userInput.value) {
  alert("Please provide a phone number")
} else if (regex.test(userInput.value)) {
  result.innerText = `Valid US number: ${userInput.value}`
} else {
  result.innerText = `Invalid US number: ${userInput.value}`
}
});

clear.addEventListener("click", () => result.innerText = "")