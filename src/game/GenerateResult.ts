import {Board, unitedBoardToBoard} from '../entities/Board'
import {UnitedBoard} from '../entities/UnitedBoard'
import {randomFromList, randomSeedFromList} from '../utils/random'
import {intersection} from '../utils/sets'
import {GetAllowedNumbers} from './GetAllowedNumbers'

const SUDOKU_SIZE = 9

export class GenerateResult {
  private tries: Array<Array<number>>
  private getAllowedNumbers: GetAllowedNumbers

  constructor(getAllowedNumbers: GetAllowedNumbers) {
    this.tries = []
    this.getAllowedNumbers = getAllowedNumbers
    this.resetTries()
  }

  private resetTries() {
    this.tries = []
    for (let row = 0; row < 81; row++) {
      this.tries.push(this.getAllowedNumbers.getAllowedNumbers())
    }
  }

  private resetTry(currentNumber: number) {
    this.tries[currentNumber] = this.getAllowedNumbers.getAllowedNumbers()
  }

  private removeTry(currentNumber: number, element: number) {
    this.tries[currentNumber] = this.tries[currentNumber].filter(
      e => e !== element
    )
  }

  private sortNumbers(
    currentNumber: number,
    defaultRow: number,
    defaultColumn: number,
    seed?: string,
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
          this.getAllowedNumbers.execute(unitedBoard, column, row)
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
            seed,
            unitedBoard
          )
        } else {
          let newNumber: number
          if (!seed || (seed && seed.length === 0)) {
            newNumber = randomFromList(allowedNumbers)
          } else {
            newNumber = randomSeedFromList(seed, allowedNumbers)
          }
          unitedBoard[row][column] = newNumber
        }
        currentNumber++
      }
      defaultColumn = 0
    }
    return unitedBoard
  }

  execute(seed?: string): Board {
    this.resetTries()
    let unitedBoard = this.sortNumbers(0, 0, 0, seed)
    const board: Board = unitedBoardToBoard(unitedBoard)
    return board
  }
}
