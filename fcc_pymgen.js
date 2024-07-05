// First block defines variables which will be used to create pym
const character = "#";
const count = 8;
const rows = [];
let inverted = true;
// Function below will take values from for loop to generate pym according to return statement
function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}
//for loop will provide iteration if conditions are met and also determine if the pym is inverted or not (toggled by let inverted above)
for (let i = 1; i <= count; i++) {
  if (inverted) {
    rows.unshift(padRow(i, count));
  } else {
    rows.push(padRow(i, count));
  }
}
// result is done in for loop to generate pym 
let result = ""

for (const row of rows) {
  result = result + "\n" + row;
}

console.log(result);