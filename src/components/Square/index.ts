import {Square as SquareEntity} from '../../entities/Square'
import {Cell} from '../Cell'
import {FunctionalComponent} from '../Component'

export class Square extends FunctionalComponent<{square: SquareEntity}> {
    constructor(square: SquareEntity) {
        super({square})
    }
    renderCells(row: number[]): string {
        return row.map(cell => new Cell(cell).render()).join('')
    }
    public addEvents(): void {}
    render(): string {
        return `
            <div class="square">${this.props?.square
                .map(this.renderCells)
                .join('')}</div>
        `
    }
}
