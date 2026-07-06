/** Normalizes user input and expected answer for comparison. */
export function normalizeAnswer(value) {
  return value.trim().toLowerCase();
}

/** Checks whether the user's answer matches the expected answer. */
export function isAnswerCorrect(userAnswer, expectedAnswer) {
  return normalizeAnswer(userAnswer) === normalizeAnswer(expectedAnswer);
}
