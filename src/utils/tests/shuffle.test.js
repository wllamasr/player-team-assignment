const { shuffle } = require("../shuffle");

describe("shuffle utility", () => {
  test("should produce the same result with the same seed", () => {
    const input = [1, 2, 3, 4, 5];
    const result1 = shuffle(input, 42);
    const result2 = shuffle(input, 42);
    expect(result1).toEqual(result2);
  });

  test("should produce different results with different seeds", () => {
    const input = [1, 2, 3, 4, 5];
    const result1 = shuffle(input, 42);
    const result2 = shuffle(input, 99);
    expect(result1).not.toEqual(result2);
  });

  test("should not mutate the original array", () => {
    const input = [1, 2, 3, 4, 5];
    const copy = [...input];
    shuffle(input, 42);
    expect(input).toEqual(copy);
  });

  test("should produce non-deterministic results if no seed is provided", () => {
    const input = [1, 2, 3, 4, 5];
    const result1 = shuffle(input); // random
    const result2 = shuffle(input); // random
    // There is a chance they are equal, but extremely low
    expect(result1).not.toEqual(result2);
  });
});