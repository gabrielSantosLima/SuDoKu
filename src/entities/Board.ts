import {Square, vectorToSquare} from './Square'
import {getSquare, UnitedBoard} from './UnitedBoard'

export type Board = Array<Square>

export function unitedBoardToBoard(unitedBoard: UnitedBoard): Board {
  let board: Board = []
  for (let row = 0; row < 9; row += 3) {
    for (let column = 0; column < 9; column += 3) {
      const square = getSquare(unitedBoard, column, row)
      board.push(vectorToSquare(square))
    }
  }

  return board
}
