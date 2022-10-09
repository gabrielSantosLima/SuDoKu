import {Square as SquareEntity} from '../../entities/Square'
import {Cell} from '../Cell'
import {Component} from '../Component'

export class Square extends Component<{square: SquareEntity}> {
    constructor(square: SquareEntity) {
        super({square})
    }

    private renderCells(row: number[]): string {
        return row.map(cell => new Cell(cell).render()).join('')
    }

    render(): string {
        return `
            <div class="square">${this.props?.square
                .map(cell => this.renderCells(cell))
                .join('')}</div>
        `
    }
}
