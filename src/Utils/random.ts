import {alea} from 'seedrandom'
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

export function randomSeedFromList<ResponseType>(
  seed: string,
  list: Array<ResponseType>
): ResponseType {
  const totalSize = list.length
  const sortedIndex = randomSeedNumber(seed, 0, totalSize)
  return list[sortedIndex]
}

export function randomSeedNumber(
  seed: string,
  min: number,
  max: number
): number {
  const arng = alea(seed)
  return Math.floor(arng() * max) + min
}
