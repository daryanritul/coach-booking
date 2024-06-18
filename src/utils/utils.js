export function generateRandomNumbers(count, min, max) {
  const randomNumbers = [];
  while (randomNumbers.length < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }
  return randomNumbers;
}
