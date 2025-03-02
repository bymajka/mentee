function moveZeros(arr) {
  const arrWithoutZero = arr.filter((el) => el !== 0);
  const zeros = [];
  for (let i = 0; i < arr.length - arrWithoutZero.length; i++) {
    zeros.push(0);
  }
  return arrWithoutZero.concat(zeros);
}
