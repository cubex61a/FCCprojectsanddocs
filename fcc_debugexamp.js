const darkColorsArr = [
    "#2C3E50",
    "#34495E",
    "#2C2C2C"
    "#616A6B"
    "#4A235A"
    "#2F4F4F",
    "#0E4B5A",
    "#36454F",
    "#2C3E50",
    "#800020",
  ];
//missing commas, in this case it will pop SyntaxError
  const darkColorsArr = [
    "#2C3E50",
    "#34495E",
    "#2C2C2C",
    "#616A6B",
    "#4A235A",
    "#2F4F4F",
    "#0E4B5A",
    "#36454F",
    "#2C3E50",
    "#800020",
  ];


  console.log(darkColorsArr.length * math.random())
//math should be capitalized, this error causes uncaught ReferenceError: math is not defined
  console.log(darkColorsArr.length * Math.random())


  function getRandomIndex() {
    console.log(darkColorsArr.length * Math.random())
  }
  getRandomIndex();
//results aren't whole numbers/integers, they come out in decimals due to missing Math.floor
function getRandomIndex() {
    console.log(Math.floor(darkColorsArr.length * Math.random()))
  }
  getRandomIndex(); 


  const body = document.queryselector("body");
  //querySelector not capped, causes uncaught TypeError
  const body = document.querySelector("body");


  const body = document.querySelector("body");
const bgHexCodeSpanElement = document.querySelector("bg-hex-code");

console.log(bgHexCodeSpanElement);
//bg-hex-code is an id, id should have # beforehand to register, causes null value
const body = document.querySelector("body");
const bgHexCodeSpanElement = document.querySelector("#bg-hex-code");

console.log(bgHexCodeSpanElement);


function changeBackgroundColor() {
    const color = darkColorsArr[getRandomIndex];
  
    bgHexCodeSpanElement.innerText = color;
    body.style.backgroundColor = color;
  }
  changeBackgroundColor();
//const color = to darkColorsArr function, FUNCTION = (), causes undefined
  function changeBackgroundColor() {
    const color = darkColorsArr[getRandomIndex()];
  
    bgHexCodeSpanElement.innerText = color;
    body.style.backgroundColor = color;
  }
  changeBackgroundColor();

  const btn = document.querySelector("#click-btn");
  console.log(btn);
//incorrect id for btn in html doc, causes null
const btn = document.querySelector("#btn");
console.log(btn);


btn.onclick = changeBackgroundColor();
//onclick property assigned to functions dont require ()
btn.onclick = changeBackgroundColor;