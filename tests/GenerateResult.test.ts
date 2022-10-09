import {describe, expect, it} from 'vitest'
import {generateResultFactory} from '../src/factory/generateResultFactory'
import {CheckResult} from '../src/game/CheckResult'
import {CompareResult} from '../src/game/CompareResult'

describe('Generate Sudoku Result', () => {
    it('Should have 9 squares', () => {
        const result = generateResultFactory().execute()
        let sizeOfSquares = result.length
        expect(sizeOfSquares).toBe(9)
    })

    it('Should have 81 numbers', () => {
        const result = generateResultFactory().execute()
        let sizeOfNumbers = 0
        for (const square of result) {
            for (const row of square) {
                sizeOfNumbers += row.length
            }
        }
        expect(sizeOfNumbers).toBe(81)
    })

    it('Should have 9 numbers within square', () => {
        const result = generateResultFactory().execute()
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

    it('Should generate random results', () => {
        const result1 = generateResultFactory().execute()
        const result2 = generateResultFactory().execute()

        expect(
            new CompareResult().execute({board1: result1, board2: result2})
        ).toBeFalsy()
    })

    it('Should generate a valid sudoku game', () => {
        const result = generateResultFactory().execute()
        expect(new CheckResult().execute(result)).toBeTruthy()
    })
})
