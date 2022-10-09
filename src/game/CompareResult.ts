import {Board} from '../entities/Board'
import {Square} from '../entities/Square'

interface RequestType {
  board1: Board
  board2: Board
}

export class CompareResult {
  private compareSquares(square1: Square, square2: Square): boolean {
    if (square1.length !== square2.length) {
      return false
    }
    for (let row = 0; row < square1.length; row++) {
      for (let column = 0; column < square1.length; column++) {
        if (square1[row][column] !== square2[row][column]) {
          return false
        }
      }
    }
    return true
  }
  execute(request: RequestType): boolean {
    const {board1, board2} = request
    for (let squareIndex = 0; squareIndex < board1.length; squareIndex++) {
      const isEqual = this.compareSquares(
        board1[squareIndex],
        board2[squareIndex]
      )
      if (!isEqual) {
        return false
      }
    }
    return true
  }
}
