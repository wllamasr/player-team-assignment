// Deterministic shuffle using seed (Fisher–Yates algorithm)
// Falls back to random if no seed is provided

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Shuffles an array deterministically if a seed is provided,
 * otherwise falls back to Math.random (non-deterministic).
 *
 * @param {Array} array - Array to shuffle
 * @param {number|null} seed - Optional seed for reproducibility
 * @returns {Array} - Shuffled array
 */
function shuffle(array, seed = null) {
  const arr = [...array];
  const random = seed !== null ? mulberry32(seed) : Math.random;

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

module.exports = shuffle;