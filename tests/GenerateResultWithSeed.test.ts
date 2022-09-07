import {describe, expect, it} from 'vitest'
import {generateResultWithSeedFactory} from '../src/Factory/generateResultWithSeedFactory'
import {CheckResult} from '../src/Game/CheckResult'
import {CompareResult} from '../src/Game/CompareResult'

describe('Generate Sudoku Result With Seed', () => {
  it('Should generate the same sudoku game', () => {
    const result1 = generateResultWithSeedFactory().execute('gabriel')
    const result2 = generateResultWithSeedFactory().execute('gabriel')

    expect(
      new CompareResult().execute({
        board1: result1,
        board2: result2,
      })
    ).toBeTruthy()
  })

  it('Should generate a valid sudoku game', () => {
    const result = generateResultWithSeedFactory().execute('gabriel')

    expect(new CheckResult().execute(result)).toBeTruthy()
  })
})
