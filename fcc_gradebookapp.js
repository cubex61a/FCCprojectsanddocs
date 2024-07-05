//function below will pull values from total to add and divide by total amt of values in array
function getAverage(scores) {
    let sum = 0;
  
    for (const score of scores) {
      sum += score;
    }
  
    return sum / scores.length;
  }
  //function will determine letter grade via studentScore
  function getGrade(score) {
    if (score === 100) {
      return "A++";
    } else if (score >= 90) {
      return "A";
    } else if (score >= 80) {
      return "B";
    } else if (score >= 70) {
      return "C";
    } else if (score >= 60) {
      return "D";
    } else {
      return "F";
    }
  }
  //function determines if the grade is anything but an F it is passing
  function hasPassingGrade(score) {
    return getGrade(score) !== "F";
  }
  //function generates message for student on whether or not they pass and what the class average is
  function studentMsg(totalScores, studentScore) {
  let passFail
  if (hasPassingGrade(studentScore)) {
      passFail = "You passed the course."
     } else {
      passFail = "You failed the course."
      }
      return "Class average: " + getAverage(totalScores) + ". Your grade: " + getGrade(studentScore) + ". " + passFail;
  }
  console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
  