export function intersection(
  array: Array<number>,
  array2: Array<number>
): Array<number> {
  const intersectionArray: Array<number> = []
  for (let element of array) {
    const index = array2.indexOf(element)
    if (index >= 0) intersectionArray.push(element)
  }
  return intersectionArray
}

export function getNumbersNotContainedIn(
  superSet: Array<number>,
  subSet: Array<number>
): Array<number> {
  return superSet.filter(element => !subSet.includes(element))
}
