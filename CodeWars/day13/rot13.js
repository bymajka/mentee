// ROT13 is a simple letter substitution cipher that replaces a letter with the letter 13 letters after it in the alphabet. ROT13 is an example of the Caesar cipher.

// Create a function that takes a string and returns the string ciphered with Rot13. If there are numbers or special characters included in the string, they should be returned as they are. Only letters from the latin/english alphabet should be shifted, like in the original Rot13 "implementation".

function rot13(message) {
  const minMaxCapital = {
    min: 64,
    max: 91,
  };
  const minMaxSmall = {
    min: 96,
    max: 123,
  };

  let resultString = "";
  for (let i = 0; i < message.length; i++) {
    let charCode = message.charAt(i).charCodeAt(0);
    let neededSymbol;
    if (charCode > minMaxCapital.min && charCode < minMaxCapital.max) {
      neededSymbol = checkLimit(charCode, minMaxCapital.max);
    } else if (charCode > minMaxSmall.min && charCode < minMaxSmall.max) {
      neededSymbol = checkLimit(charCode, minMaxSmall.max);
    } else neededSymbol = message.charAt(i);
    resultString += neededSymbol;
  }
  return resultString;

  function checkLimit(charCode, max) {
    let neededSymbol;

    if (charCode + 13 < max) neededSymbol = String.fromCharCode(charCode + 13);
    else neededSymbol = String.fromCharCode(charCode - 13);

    return neededSymbol;
  }
}
