export function randomFromList<ResponseType>(
  list: Array<ResponseType>
): ResponseType {
  const totalSize = list.length
  const sortedIndex = randomNumber(0, totalSize)
  return list[sortedIndex]
}

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * max) + min
}
