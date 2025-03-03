// Move the first letter of each word to the end of it, then add "ay" to the end of the word. Leave punctuation marks untouched.

// Examples
// pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
// pigIt('Hello world !');     // elloHay orldway !

function pigIt(str) {
  const words = str.split(" ");
  return words
    .map((word) => {
      return word.match(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g)
        ? word
        : word.concat(word[0], "ay").substring(1);
    })
    .join(" ");
}

console.log(pigIt("Pig latin is cool"));
