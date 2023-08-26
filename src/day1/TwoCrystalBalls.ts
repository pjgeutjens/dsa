export default function two_crystal_balls(breaks: boolean[]): number {
  const step = Math.floor(Math.sqrt(breaks.length))
  let i = step;

  for (; i < breaks.length; i += step) {
    if (breaks[i]) {
      break;
    }
  }

  let j = i - step

  for (; j < i && i < breaks.length; j++) {
    if (breaks[j]) {
      return j
    }
  }
  return -1
}
