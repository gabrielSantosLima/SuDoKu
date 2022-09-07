import {describe, expect, it} from 'vitest'
import {UnitedBoard} from '../src/Entities/UnitedBoard'
import {GetAllowedNumbers} from '../src/Game/GetAllowedNumbers'

describe('Get Allowed Numbers', () => {
  it('Should return the correct number in position 0,0', () => {
    const matrix: UnitedBoard = [
      [0, 3, 5, 6, 2, 7, 8, 1, 9],
      [6, 2, 7, 8, 1, 9, 4, 3, 5],
      [8, 1, 9, 4, 3, 5, 6, 2, 7],
      [3, 6, 2, 5, 7, 4, 1, 9, 8],
      [5, 7, 4, 1, 9, 8, 2, 6, 3],
      [1, 9, 8, 2, 6, 3, 5, 7, 4],
      [7, 5, 1, 3, 4, 2, 9, 8, 6],
      [2, 4, 3, 9, 8, 6, 7, 5, 1],
      [9, 8, 6, 7, 5, 1, 3, 4, 2],
    ]
    expect(new GetAllowedNumbers().execute(matrix, 0, 0)).toEqual([4])
  })

  it('Should return the correct numbers in position 0,0', () => {
    const matrix: UnitedBoard = [
      [0, 3, 5, 6, 0, 7, 8, 1, 9],
      [6, 0, 7, 8, 1, 9, 4, 3, 5],
      [8, 1, 9, 4, 3, 5, 6, 2, 7],
      [3, 6, 2, 5, 7, 4, 1, 9, 8],
      [5, 7, 4, 1, 9, 8, 2, 6, 3],
      [1, 9, 8, 2, 6, 3, 5, 7, 4],
      [7, 5, 1, 3, 4, 2, 9, 8, 6],
      [0, 4, 3, 9, 8, 6, 7, 5, 1],
      [9, 8, 6, 7, 5, 1, 3, 4, 2],
    ]
    expect(new GetAllowedNumbers().execute(matrix, 0, 0)).toEqual([2, 4])
  })

  it('Should return a empty array when sudoku has completed', () => {
    const matrix: UnitedBoard = [
      [4, 3, 5, 6, 2, 7, 8, 1, 9],
      [6, 2, 7, 8, 1, 9, 4, 3, 5],
      [8, 1, 9, 4, 3, 5, 6, 2, 7],
      [3, 6, 2, 5, 7, 4, 1, 9, 8],
      [5, 7, 4, 1, 9, 8, 2, 6, 3],
      [1, 9, 8, 2, 6, 3, 5, 7, 4],
      [7, 5, 1, 3, 4, 2, 9, 8, 6],
      [2, 4, 3, 9, 8, 6, 7, 5, 1],
      [9, 8, 6, 7, 5, 1, 3, 4, 2],
    ]
    expect(new GetAllowedNumbers().execute(matrix, 0, 0)).toEqual([])
  })
})
