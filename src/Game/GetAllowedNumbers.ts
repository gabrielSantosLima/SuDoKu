import {
  getColumn,
  getRow,
  getSquare,
  UnitedBoard,
} from '../Entities/UnitedBoard'
import {getNumbersNotContainedIn, intersection} from '../Utils/sets'

export class GetAllowedNumbers {
  public getAllowedNumbers(): Array<number> {
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

  execute(matrix: UnitedBoard, x: number, y: number): Array<number> {
    const allowedNumbers = intersection(
      intersection(
        this.getAllowedNumbersInRow(matrix, y),
        this.getAllowedNumbersInColumn(matrix, x)
      ),
      this.getAllowedNumbersInSquare(matrix, x, y)
    )
    return allowedNumbers
  }
}
