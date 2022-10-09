import {Component} from '../Component'

export class Cell extends Component<{value: number}> {
    constructor(value: number) {
        super({value})
    }

    render(): string {
        return `
            <div class="cell">${
                this.props && this.props?.value > 0 ? this.props?.value : ''
            }</div>
        `
    }
}
