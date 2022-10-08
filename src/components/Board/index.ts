import {Board as BoardEntity} from '../../entities/Board'
import {Square as SquareEntity} from '../../entities/Square'
import {FunctionalComponent} from '../Component'
import {Square} from '../Square'

export class Board extends FunctionalComponent<{board: BoardEntity}> {
    constructor(board: BoardEntity) {
        super({board})
    }
    renderSquares(square: SquareEntity) {
        return new Square(square).render()
    }
    public addEvents(): void {}
    render(): string {
        return `
            <div class="board">${this.props?.board
                .map(this.renderSquares)
                .join('')}</div>
        `
    }
}
