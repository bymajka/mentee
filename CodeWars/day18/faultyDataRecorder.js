// The problem
// A common way to prevent data loss in case of hard disk failures is to use an array of disks that keep the information redundant. If a disk fails, the information can be recovered based on the information contained in the other disks.

// The simplest example to reason about this is by having two disks with exactly the same information mirrored on each other. While this solves the problem, is not very efficient.

// Example 1. Two identical disks. If one fails, it can be rebuilt by cloning the surviving disk:

// A = [0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0]
// B = [0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0]
// A better method is to use XOR for parity checks. A simple use of XOR to create parity on an array of disks is to use several disks of the same size and reserve one of them to hold parity information.

// Let's start with a three disk array: A, B and C. We'll store our data on A and B, and we'll use C to store parity information.

// Example 2. Parity array calculated from values from A and B:

// A = [0, 0, 0, 1, 1, 1, 1, 0]
// B = [0, 1, 0, 0, 1, 0, 1, 0]

// C = [0, 1, 0, 1, 0, 1, 0, 0]
// This is how we calculate the values for C: for each column in the array, we count how many ones there are. If the result is odd, we set 1 on C. Otherwise, we set 0.

// For instance:

// A[0] + B[0] == 0, which is even, so C[0] = 0
// A[1] + B[1] == 1, which is odd, so C[1] = 1
// If any of the disks is damaged, it can be rebuilt by recalculating the parity information.

// You are not restricted to 2 arrays, and can have as many arrays as you like.

// Example 3. The data is distributed across disks A-D, and the disk E is used for parity bits:

// A = [0, 0, 0, 1]
// B = [1, 1, 1, 0]
// C = [0, 1, 0, 0]
// D = [1, 0, 1, 0]

// E = [0, 0, 0, 1]
// The challenge
// In this kata, you are going to write two functions: one for calculating the parity, and another for recovering a damaged disk.

// The first function receives an array of n sub-arrays of zeros and ones, all of the same length l. It must calculate the parity of the cluster, and return an array of n+1 sub-arrays of length l (with the parity-bits array appended at the end). For example:

// Input = [
//   [0, 0, 0, 1],
//   [1, 1, 0, 0]
// ]

// Result = [
//   [0, 0, 0, 1],
//   [1, 1, 0, 0],
//   [1, 1, 0, 1]
// ]
// The second function receives an array of n sub-arrays of zeros and ones (all of the same length) where the last sub-array includes the parity bits. One of the sub-arrays in the cluster is damaged, and some of its elements are replaced with empty values. The function must restore those missing values. For example:

// Input = [
//   [0,    0, 0, 1],
//   [NULL, 1, 0, 0],
//   [1,    1, 0, 1]
// ]

// Result = [
//   [0, 0, 0, 1],
//   [1, 1, 0, 0],
//   [1, 1, 0, 1]
// ]
// NULL is different depending on your language (null, None, ..)

function calculateParity(cluster) {
  const result = [];
  cluster.forEach((disk) => {
    disk.forEach((el, index) => {
      if (result[index] == null) result[index] = el;
      else if ((result[index] += el) % 2 === 0) result[index] = 0;
      else result[index] = 1;
    });
  });
  cluster.push(result);
  return cluster;
}

function recoverDisk(cluster) {
  let nullPositions = [];

  // Find all null positions
  cluster.forEach((disk, ind) => {
    disk.forEach((val, index) => {
      if (val === null) {
        nullPositions.push({ ind, index });
      }
    });
  });

  // Process each null position
  nullPositions.forEach(({ ind, index }) => {
    let sum = cluster.reduce((acum, row) => acum + (row[index] ?? 0), 0);
    cluster[ind][index] = sum % 2 === 0 ? 0 : 1;
  });

  return cluster;
}

// console.log(
//   calculateParity([
//     [0, 0, 0, 1, 1, 1, 1, 0],
//     [0, 1, 0, null, 1, 0, 1, 0],
//   ])
// );

// console.log(
//   recoverDisk([
//     [0, 0, 0, 1],
//     [0, null, 0, 0],
//     [0, 1, 0, 1],
//   ])
// );
