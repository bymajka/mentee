// Your job is to write a function which increments a string, to create a new string.

// If the string already ends with a number, the number should be incremented by 1.
// If the string does not end with a number. the number 1 should be appended to the new string.
// Examples:

// foo -> foo1

// foobar23 -> foobar24

// foo0042 -> foo0043

// foo9 -> foo10

// foo099 -> foo100

// Attention: If the number has leading zeros the amount of digits should be considered.

function incrementString(string) {
  let numLastString = "";
  let stringWithoutLastNum = "";
  for (let i = string.length - 1; i <= string.length; i--) {
    if (string.charAt(i) >= "0" && string.charAt(i) <= "9") {
      numLastString = string.charAt(i) + numLastString;
    } else {
      stringWithoutLastNum = string.slice(0, i + 1);
      break;
    }
  }
  if (numLastString) {
    let newNumber = (parseInt(numLastString, 10) + 1).toString();
    let result = newNumber.padStart(numLastString.length, "0");
    return stringWithoutLastNum.concat(result);
  } else {
    return stringWithoutLastNum.concat("1");
  }
}
