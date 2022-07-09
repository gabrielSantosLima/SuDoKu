import {describe, expect, it} from 'vitest'
import {CheckResult} from '../src/Game/CheckResult'
import {CompareResult} from '../src/Game/CompareResult'
import {GenerateResult} from '../src/Game/GenerateResult'

describe('Generate Sudoku Result', () => {
  it('Should be have 9 squares', () => {
    const generateResult = new GenerateResult()
    const result = generateResult.execute()
    let sizeOfSquares = result.length
    expect(sizeOfSquares).toBe(9)
  })

  it('Should be have 81 numbers', () => {
    const generateResult = new GenerateResult()
    const result = generateResult.execute()
    let sizeOfNumbers = 0
    for (const square of result) {
      for (const row of square) {
        sizeOfNumbers += row.length
      }
    }
    expect(sizeOfNumbers).toBe(81)
  })

  it('Should be have 9 numbers within square', () => {
    const generateResult = new GenerateResult()
    const result = generateResult.execute()
    let hasNineNumbersWithinEachSquare = true
    for (const square of result) {
      let sizeOfNumbers = 0
      for (const row of square) {
        sizeOfNumbers += row.length
      }
      if (sizeOfNumbers !== 9) {
        hasNineNumbersWithinEachSquare = false
      }
    }
    expect(hasNineNumbersWithinEachSquare).toBeTruthy()
  })

  it('Should be generate random results', () => {
    const generateResult = new GenerateResult()
    const compareResult = new CompareResult()

    const result1 = generateResult.execute()
    const result2 = generateResult.execute()

    expect(
      compareResult.execute({board1: result1, board2: result2})
    ).toBeFalsy()
  })

  it('Should be generate a valid sudoku game', () => {
    const generateResult = new GenerateResult()
    const checkResult = new CheckResult()

    const result = generateResult.execute()

    expect(checkResult.execute(result)).toBeTruthy()
  })
})
