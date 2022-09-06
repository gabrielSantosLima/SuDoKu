export type Square = Array<Array<number>>

export function vectorToSquare(vector: Array<number>): Square {
  const square: Square = []
  square.push([vector[0], vector[1], vector[2]])
  square.push([vector[3], vector[4], vector[5]])
  square.push([vector[6], vector[7], vector[8]])
  return square
}
