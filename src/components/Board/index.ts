import {Board as BoardEntity} from '../../entities/Board'
import {Square as SquareEntity} from '../../entities/Square'
import {GetAllowedNumbers} from '../../game/GetAllowedNumbers'
import {randomFromList} from '../../utils/random'
import {Component} from '../Component'
import {Square} from '../Square'

export class Board extends Component<{
    board: BoardEntity
    level: number
}> {
    constructor(board: BoardEntity, level: number) {
        super({board, level})
    }

    private renderSquares(square: SquareEntity) {
        let finalSquares: SquareEntity = []
        const sortedIndex: number[] = []
        let allowedNumbers = new GetAllowedNumbers().getAllowedNumbers()
        let tries = this.props?.level ?? 3
        while (tries > 0) {
            const index = randomFromList(allowedNumbers)
            sortedIndex.push(index)
            tries--
        }
        let currentIndex = 1
        for (let row = 0; row < 3; row++) {
            finalSquares.push([])
            for (let column = 0; column < 3; column++) {
                if (sortedIndex.includes(currentIndex))
                    finalSquares[row].push(-1)
                else finalSquares[row].push(square[row][column])
                currentIndex++
            }
        }
        return new Square(finalSquares).render()
    }

    render(): string {
        return `
            <div class="board">${this.props?.board
                .map(square => this.renderSquares(square))
                .join('')}</div>
        `
    }
}
