import {Board, unitedBoardToBoard} from '../Entities/Board'
import {
  getColumn,
  getRow,
  getSquare,
  UnitedBoard,
} from '../Entities/UnitedBoard'
import {randomFromList} from '../Utils/random'
import {getNumbersNotContainedIn, intersection} from '../Utils/sets'
import {IUseCase} from './IUseCase'

const SUDOKU_SIZE = 9

export class GenerateResult implements IUseCase<void, Board> {
  private tries: Array<Array<number>>

  constructor() {
    this.tries = []
    this.resetTries()
  }

  private resetTries() {
    this.tries = []
    for (let row = 0; row < 81; row++) {
      this.tries.push(this.getAllowedNumbers())
    }
  }

  private resetTry(currentNumber: number) {
    this.tries[currentNumber] = this.getAllowedNumbers()
  }

  private removeTry(currentNumber: number, element: number) {
    this.tries[currentNumber] = this.tries[currentNumber].filter(
      e => e !== element
    )
  }

  private getAllowedNumbers(): Array<number> {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }

  private getAllowedNumbersInSquare(
    matrix: UnitedBoard,
    x: number,
    y: number
  ): Array<number> {
    let allowedNumbers = this.getAllowedNumbers()
    const square = getSquare(matrix, x, y)
    allowedNumbers = getNumbersNotContainedIn(allowedNumbers, square)
    return allowedNumbers
  }

  private getAllowedNumbersInColumn(
    matrix: UnitedBoard,
    x: number
  ): Array<number> {
    let allowedNumbers = this.getAllowedNumbers()
    const column = getColumn(matrix, x)
    allowedNumbers = getNumbersNotContainedIn(allowedNumbers, column)
    return allowedNumbers
  }

  private getAllowedNumbersInRow(
    matrix: UnitedBoard,
    y: number
  ): Array<number> {
    let allowedNumbers = this.getAllowedNumbers()
    const row = getRow(matrix, y)
    allowedNumbers = getNumbersNotContainedIn(allowedNumbers, row)
    return allowedNumbers
  }

  private getAllowedNumbersIn(
    matrix: UnitedBoard,
    x: number,
    y: number
  ): Array<number> {
    const allowedNumbers = intersection(
      intersection(
        this.getAllowedNumbersInRow(matrix, y),
        this.getAllowedNumbersInColumn(matrix, x)
      ),
      this.getAllowedNumbersInSquare(matrix, x, y)
    )
    return allowedNumbers
  }

  private sortNumbers(
    currentNumber: number,
    defaultRow: number,
    defaultColumn: number,
    unitedBoard: UnitedBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
  ): UnitedBoard {
    for (let row = defaultRow; row < SUDOKU_SIZE; row++) {
      for (let column = defaultColumn; column < SUDOKU_SIZE; column++) {
        const allowedNumbers = intersection(
          this.tries[currentNumber],
          this.getAllowedNumbersIn(unitedBoard, column, row)
        )
        if (allowedNumbers.length === 0) {
          let lastRow = row
          let lastColumn = column - 1

          if (column === 0) {
            lastRow = row - 1
            lastColumn = 8
          }
          if (lastRow < 0 || lastColumn < 0) {
            return unitedBoard
          }
          this.removeTry(currentNumber - 1, unitedBoard[lastRow][lastColumn])
          this.resetTry(currentNumber)
          unitedBoard[row][column] = 0
          return this.sortNumbers(
            currentNumber - 1,
            lastRow,
            lastColumn,
            unitedBoard
          )
        } else {
          const newNumber = randomFromList(allowedNumbers)
          unitedBoard[row][column] = newNumber
        }
        currentNumber++
      }
      defaultColumn = 0
    }
    return unitedBoard
  }

  execute(): Board {
    this.resetTries()
    let unitedBoard = this.sortNumbers(0, 0, 0)
    const board: Board = unitedBoardToBoard(unitedBoard)
    return board
  }
}
