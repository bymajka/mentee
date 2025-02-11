// Write a function that takes an integer as input, and returns the number of bits that are equal to one in the binary representation of that number. You can guarantee that input is non-negative.

// Example: The binary representation of 1234 is 10011010010, so the function should return 5 in this case

var countBits = function (n) {
  if (n == 0) return 0;
  let quotient = n;
  let remainder = n;
  let stringBinary = "";
  while (quotient > 0) {
    remainder = quotient % 2;
    quotient = Math.floor(quotient / 2);
    stringBinary = stringBinary.concat(remainder);
  }
  return stringBinary.split("").filter((a) => a == 1).length;
};

console.log(countBits(0));
console.log(countBits(4));
console.log(countBits(7));
console.log(countBits(9));
console.log(countBits(10));
