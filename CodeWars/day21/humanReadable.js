// Write a function, which takes a non-negative integer (seconds) as input and returns the time in a human-readable format (HH:MM:SS)

// HH = hours, padded to 2 digits, range: 00 - 99
// MM = minutes, padded to 2 digits, range: 00 - 59
// SS = seconds, padded to 2 digits, range: 00 - 59
// The maximum time never exceeds 359999 (99:59:59)

// You can find some examples in the test fixtures.

function humanReadable(seconds) {
  const checkDozens = (number) => (number < 10 ? "0" + number : number);
  let hou = Math.floor(seconds / 3600);
  let min = Math.floor(seconds / 60 - hou * 60);
  let sec = Math.floor(seconds - (hou * 60 + min) * 60);
  return `${checkDozens(hou)}:${checkDozens(min)}:${checkDozens(sec)}`;
}

console.log(humanReadable(90));
