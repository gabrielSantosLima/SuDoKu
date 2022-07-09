import {Board} from '../Entities/Board'
import {Square} from '../Entities/Square'
import {randomFromList} from '../Utils/random'
import {IUseCase} from './IUseCase'

export class GenerateResult implements IUseCase<void, Board> {
  private generateRow(allowedNumbers: Array<number>): Array<number> {
    const row: Array<number> = []
    let currentAllowedNumbers = [...allowedNumbers]
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
      const number = randomFromList(currentAllowedNumbers)
      currentAllowedNumbers = currentAllowedNumbers.filter(
        currentAllowedNumber => currentAllowedNumber !== number
      )
      row.push(number)
    }
    return row
  }

  private generateSquare(): Square {
    const square: Square = []
    let allowedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const row = this.generateRow(allowedNumbers)
      allowedNumbers = allowedNumbers.filter(number => !row.includes(number))
      square.push(row)
    }
    return square
  }

  private generateBoard(): Board {
    const board: Board = []
    for (let squareIndex = 0; squareIndex < 9; squareIndex++) {
      const square = this.generateSquare()
      board.push(square)
    }
    return board
  }

  execute(): Board {
    const board = this.generateBoard()
    return board
  }
}
