import {Board} from '../Entities/Board'
import {IUseCase} from './IUseCase'

interface RequestType {
  board1: Board
  board2: Board
}

export class CompareResult implements IUseCase<RequestType, Boolean> {
  execute(request: RequestType): Boolean {
    const {board1, board2} = request

    let isEqual = true

    for (let squareIndex = 0; squareIndex < board1.length; squareIndex++) {
      board1[squareIndex].forEach((row, rowIndex) => {
        row.forEach((number, columnIndex) => {
          if (number !== board2[squareIndex][rowIndex][columnIndex]) {
            isEqual = false
            return
          }
        })
      })
      if (!isEqual) {
        return false
      }
    }

    return true
  }
}
