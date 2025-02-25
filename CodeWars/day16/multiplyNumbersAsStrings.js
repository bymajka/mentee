// Write a function called sumIntervals/sum_intervals that accepts an array of intervals, and returns the sum of all the interval lengths. Overlapping intervals should only be counted once.

// Intervals
// Intervals are represented by a pair of integers in the form of an array. The first value of the interval will always be less than the second value. Interval example: [1, 5] is an interval from 1 to 5. The length of this interval is 4.

// Overlapping Intervals
// List containing overlapping intervals:

// [
//    [1, 4],
//    [7, 10],
//    [3, 5]
// ]
// The sum of the lengths of these intervals is 7. Since [1, 4] and [3, 5] overlap, we can treat the interval as [1, 5], which has a length of 4.

// Examples:
// sumIntervals( [
//    [1, 2],
//    [6, 10],
//    [11, 15]
// ] ) => 9

// sumIntervals( [
//    [1, 4],
//    [7, 10],
//    [3, 5]
// ] ) => 7

// sumIntervals( [
//    [1, 5],
//    [10, 20],
//    [1, 6],
//    [16, 19],
//    [5, 11]
// ] ) => 19

// sumIntervals( [
//    [0, 20],
//    [-100000000, 10],
//    [30, 40]
// ] ) => 100000030
// Tests with large intervals
// Your algorithm should be able to handle large intervals. All tested intervals are subsets of the range [-1000000000, 1000000000].

function sumIntervals(intervals) {
  let n = intervals.length;

  intervals.sort((a, b) => a[0] - b[0]);
  let res = [];
  debugger;
  for (let i = 0; i < n; i++) {
    let start = intervals[i][0];
    let end = intervals[i][1];

    if (res.length > 0 && res[res.length - 1][1] >= end) {
      continue;
    }

    for (let j = i + 1; j < n; j++) {
      if (intervals[j][0] <= end) {
        end = Math.max(end, intervals[j][1]);
      }
    }
    res.push([start, end]);
  }
  console.log(res);

  return res
    .map((interval) => Math.max(...interval) - Math.min(...interval))
    .reduce((acum, current) => {
      return acum + current;
    }, 0);
}

console.log(
  sumIntervals([
    [1, 4],
    [7, 10],
    [3, 5],
  ])
);
