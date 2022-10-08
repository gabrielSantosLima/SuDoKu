import {FunctionalComponent} from '../Component'

export class Cell extends FunctionalComponent<{value: number}> {
    constructor(value: number) {
        super({value})
    }
    public addEvents(): void {}
    render(): string {
        return `
            <div class="cell">${
                this.props && this.props?.value > 0 ? this.props?.value : ''
            }</div>
        `
    }
}
