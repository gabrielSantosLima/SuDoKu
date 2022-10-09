import {Board} from './Board'

const SUDOKU_SIZE = 9

export type UnitedBoard = Array<Array<number>>

export function getSquare(
  matrix: UnitedBoard,
  x: number,
  y: number
): Array<number> {
  function calculateInitialPositionOfSquare(
    x: number,
    y: number
  ): [number, number] {
    let initialRow = y - (y % 3)
    let initialColumn = x - (x % 3)
    return [initialRow, initialColumn]
  }

  const square: Array<number> = []
  let [row, column] = calculateInitialPositionOfSquare(x, y)
  let rowCounter = 3
  let columnCounter = 3
  while (rowCounter !== 0) {
    while (columnCounter !== 0) {
      square.push(matrix[row][column])
      column++
      columnCounter--
    }
    column = calculateInitialPositionOfSquare(x, y)[1]
    columnCounter = 3
    row++
    rowCounter--
  }
  return square
}

export function getRow(matrix: UnitedBoard, y: number): Array<number> {
  return matrix[y]
}

export function getColumn(matrix: UnitedBoard, x: number): Array<number> {
  const column: Array<number> = []
  for (let index = 0; index < SUDOKU_SIZE; index++) {
    column.push(matrix[index][x])
  }
  return column
}

export function boardToUnitedBoard(board: Board): UnitedBoard {
  let unitedBoard: UnitedBoard = []
  for (let index = 0; index < 3; index++) {
    const startPosition = 3 * index
    const endPosition = startPosition + 3

    for (let row = 0; row < 3; row++) {
      unitedBoard.push([])
      for (let column = startPosition; column < endPosition; column++) {
        unitedBoard[unitedBoard.length - 1].push(...board[column][row])
      }
    }
  }
  return unitedBoard
}
