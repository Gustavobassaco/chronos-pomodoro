export function getNextCycle(currentCycle: number) {
  // if (currentCycle === 0 || currentCycle === 8) {
  //   return 1;
  // }
  // return (currentCycle + 1);
  return currentCycle === 0 || currentCycle === 8 ? 1 : currentCycle + 1;
}
