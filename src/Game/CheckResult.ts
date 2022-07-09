import {Board} from '../Entities/Board'
import {Square} from '../Entities/Square'
import {UnitedBoard} from '../Entities/UnitedBoard'
import {IUseCase} from './IUseCase'

export class CheckResult implements IUseCase<Board, Boolean> {
  private containsRepeatedNumbers(numbers: Array<number>): Boolean {
    for (let firstIndex = 0; firstIndex < numbers.length; firstIndex++) {
      for (let secondIndex = 0; secondIndex < numbers.length; secondIndex++) {
        if (
          secondIndex !== firstIndex &&
          numbers[firstIndex] === numbers[secondIndex]
        ) {
          return true
        }
      }
    }
    return false
  }

  private checkSquare(square: Square): Boolean {
    let unitedSquare: Array<number> = []
    for (let row of square) {
      unitedSquare = [...unitedSquare, ...row]
    }
    return !this.containsRepeatedNumbers(unitedSquare)
  }

  private checkBoard(board: UnitedBoard): Boolean {
    for (let row of board) {
      const isValid = !this.containsRepeatedNumbers(row)
      if (!isValid) {
        return false
      }
    }
    for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
      const column = []
      for (let row = 0; row < 9; row++) {
        column.push(board[row][columnIndex])
      }
      const isValid = !this.containsRepeatedNumbers(column)
      if (!isValid) {
        return false
      }
    }
    return true
  }

  private combineToUnitedBoard(board: Board): UnitedBoard {
    let unitedBoard: UnitedBoard = []
    for (let row = 0; row < 3; row++) {
      unitedBoard.push([])
      for (let column = 0; column < 3; column++) {
        unitedBoard[unitedBoard.length - 1].push(...board[column][row])
      }
    }
    for (let row = 0; row < 3; row++) {
      unitedBoard.push([])
      for (let column = 3; column < 6; column++) {
        unitedBoard[unitedBoard.length - 1].push(...board[column][row])
      }
    }
    for (let row = 0; row < 3; row++) {
      unitedBoard.push([])
      for (let column = 6; column < 9; column++) {
        unitedBoard[unitedBoard.length - 1].push(...board[column][row])
      }
    }
    return unitedBoard
  }

  execute(request: Board): Boolean {
    const unitedBoard = this.combineToUnitedBoard(request)
    const isValidBoard = this.checkBoard(unitedBoard)
    if (!isValidBoard) {
      return false
    }
    for (const square of request) {
      const isValidSquare = this.checkSquare(square)
      if (!isValidSquare) {
        return false
      }
    }
    return true
  }
}
