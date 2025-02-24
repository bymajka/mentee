// "The Room" is a 2003 independent romantic drama film written, directed, and produced by Tommy Wiseau. Despite its initial poor reception, it has since gained cult status for its unintentionally hilarious dialogue, bizarre storytelling, and Wiseau's eccentric performance. The film's plot revolves around a love triangle between Johnny (Wiseau), his fiancée Lisa, and his best friend Mark.

// Drawing inspiration from both the original film and its dramatized making-of story in "The Disaster Artist," this coding challenge captures the essence of the film's dramatic relationships.

// Task
// Create a function that calculates the "drama score" for each person in a room based on their relationships. The scenario involves all the people sitting together, where no secrets can be kept. All relationships, including secret affairs, are revealed, leading to dramatic confrontations and realizations.

// Input
// A list of people in the room, where each person is a tuple containing:
// name (string): A unique name
// partner (string or None): Name of the person's partner (if any), None (or equivalent in your language) otherwise
// friends (list of strings): Names of the person's friends
// lovers (list of strings): Names of the person's lovers
// Output
// A dictionary with:
// Keys: Person's name
// Values: Person's drama score, which represents the total "dramatic entanglement" of that person in this interconnected social network
// Constraints
// Each person mentioned as a partner, friend, or lover is present in the room.
// All relationships are mutual, meaning if A has B as a partner/friend/lover, B would also have A.
// A partner cannot simultaneously be a friend or lover of the same person.
// A friend can be a lover to the same person.
// A lover can be a friend to the same person.
// 3 ≤ people in room ≤ 10
// Drama Score Calculation
// Each person begins with a base score of 0. The drama score is then calculated by accumulating points according to the following rules:

// Rule	Description	Points
// #1: Lovers While Partnered	If a person has a partner, add points for each lover they have	+1 per lover
// #2: Partner's Friends as Lovers	If a person has a partner, add points for each lover who is a friend of their partner	+1 per qualifying lover
// #3: Friends' Partners as Lovers	Add points for each lover that is the partner of one of their friends	+1 per qualifying lover
// #4: Completely Uninvolved	Add points for each person without a partner who also has no lovers	+1 per uninvolved person
// Note: Rule #4 reflects the paradoxical drama of being completely uninvolved.

// Aftermath: Tommy's Drama Meter
// If the total drama score in the room is 0, and "Tommy" is present, he becomes enraged.
// Add 5 points to Tommy's score.
// Examples
// room: [
//   ("Bob", "Alice", [], ["Lucia", "Sam"]),
//   ("Alice", "Bob", [], []),
//   ("Lucia", "Tom", [], ["Bob"]),
//   ("Tom", "Lucia", [], []),
//   ("Sam", "Gerd", [], ["Bob"]),
//   ("Gerd", "Sam", [], []),
// ],
// expected: {
//   "Bob": 2,     # Bob betrays Alice with Lucia and Sam (Rule #1: +2)
//   "Alice": 0,
//   "Lucia": 1,   # Lucia betrays Tom with Bob (Rule #1: +1)
//   "Tom": 0,
//   "Sam": 1,     # Sam betrays Gerd with Bob (Rule #1: +1)
//   "Gerd": 0,
// },
// room: [
//   ("Bob", "Alice", [], ["Lucia", "Sam"]),
//   ("Alice", "Bob", ["Sam", "Gerd"], []),
//   ("Lucia", "Tom", [], ["Bob"]),
//   ("Tom", "Lucia", [], []),
//   ("Sam", "Gerd", ["Alice"], ["Bob"]),
//   ("Gerd", "Sam", ["Alice"], []),
// ],
// expected: {
//   "Bob": 3,     # Bob betrays Alice with Lucia and Sam (Rule #1: +2)
//                 # Sam is a friend of Alice (Rule #2: +1)
//   "Alice": 0,
//   "Lucia": 1,   # Lucia betrays Tom with Bob (Rule #1: +1)
//   "Tom": 0,
//   "Sam": 2,     # Sam betrays Gerd with Bob (Rule #1: +1)
//                 # Sam betrays her friend Alice with her partner Bob (Rule #3: +1)
//   "Gerd": 0,
// },
// room: [
//   ("Bob", None, ["Hank", "Burt", "Jane"], ["Jane"]),
//   ("Hank", "Jane", ["Bob"], []),
//   ("Jane", "Hank", ["Bob"], ["Bob"]),
//   ("Burt", None, ["Bob"], []),
// ],
// expected: {
//   "Bob": 1,     # Bob betrays his friend Hank with his partner Jane (Rule #3: +1)
//   "Hank": 0,
//   "Jane": 2,    # Jane betrays Hank with Bob (Rule #1: +1)
//                 # Bob is a friend of Hank (Rule #2: +1)
//   "Burt": 1,    # Burt has no partner or lovers (Rule #4: +1)
// },
// room: [
//   ("Tommy", "Alice", ["Tom"], []),
//   ("Alice", "Tommy", [], []),
//   ("Lucia", "Tom", [], []),
//   ("Tom", "Lucia", ["Tommy"], []),
//   ("Sam", "Gerd", [], []),
//   ("Gerd", "Sam", [], []),
// ],
// expected: {
//   "Tommy": 5,     # Tommy gets enraged by the lack of drama (+5)
//   "Alice": 0,
//   "Lucia": 0,
//   "Tom": 0,
//   "Sam": 0,
//   "Gerd": 0,
// },
// Good luck, the truth will come out!

function dramameter(room) {
  const people = new Map();
  room.forEach(([name, partner, friends, lovers]) => {
    people.set(name, { name, partner, friends, lovers, score: 0 });
  });

  // Rule 1
  for (const person of people.values()) {
    if (person.partner && person.lovers.length > 0) {
      person.score += person.lovers.length;
    }
  }

  // Rule 2
  for (const person of people.values()) {
    if (person.partner) {
      const partner = people.get(person.partner);
      if (partner) {
        person.score += person.lovers.filter((lover) =>
          partner.friends.includes(lover)
        ).length;
      }
    }
  }

  // Rule 3
  for (const person of people.values()) {
    person.score += person.lovers.filter((lover) =>
      person.friends.some((friend) => people.get(friend)?.partner === lover)
    ).length;
  }

  // Rule 4
  const uninvolved = [...people.values()].filter(
    (p) => !p.partner && p.lovers.length === 0
  );
  uninvolved.forEach((p) => p.score++);

  if ([...people.values()].every((p) => p.score === 0) && people.has("Tommy")) {
    people.get("Tommy").score += 5;
  }

  return Object.fromEntries(
    [...people.values()].map(({ name, score }) => [name, score])
  );
}

console.log(
  dramameter([
    ["Bob", "Alice", [], ["Lucia", "Sam"]],
    ["Alice", "Bob", [], []],
    ["Lucia", "Tom", [], ["Bob"]],
    ["Tom", "Lucia", [], []],
    ["Sam", "Gerd", [], ["Bob"]],
    ["Gerd", "Sam", [], []],
  ])
);
