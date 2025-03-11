function score(dice) {
  let score = 0;
  const map = new Map([
    ["1", 100],
    ["5", 50],
    ["1,1,1", 1000],
    ["2,2,2", 200],
    ["3,3,3", 300],
    ["4,4,4", 400],
    ["5,5,5", 500],
    ["6,6,6", 600]
  ]);

  const sortedDice = [...dice].sort((a, b) => a - b);
  for (let i = 0; i < sortedDice.length; i++) {
    const key = sortedDice.slice(i, i + 3).join(",");

    if (map.has(key)) {
      score += map.get(key);
    }
  }
  if (score === 0) {
    for (let i = 0; i < sortedDice.length; i++) {
      score += map.get(sortedDice[i].toString()) || 0;
    }
  }
  return score;
}

console.log(score([1, 2, 3, 4, 6]));

