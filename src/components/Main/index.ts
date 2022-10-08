import {Board as BoardEntity} from '../../entities/Board'
import {generateResultWithSeedFactory} from '../../factory/generateResultWithSeedFactory'
import {Board} from '../Board'
import {FunctionalComponent} from '../Component'
import './styles.css'

const arrowCommands: any = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
}

const numberCommands: any = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
}

function getKeyboardCommand(event: KeyboardEvent) {
    const {key} = event
    return {
        command: numberCommands[key] ?? arrowCommands[key],
    }
}

export class Main extends FunctionalComponent {
    private board: BoardEntity
    constructor() {
        super()
        const generateResult = generateResultWithSeedFactory()
        this.board = generateResult.execute(new Date().toDateString())
    }

    addKeyboardEffect(event: KeyboardEvent) {
        const {command} = getKeyboardCommand(event)
        if (command) {
            const keyElement = document.querySelector(`[data-key="${command}"]`)
            keyElement?.classList.add('clicked')
            const currentSelected = document.querySelector(
                '.selected'
            ) as HTMLDivElement
            if (Object.values(arrowCommands).includes(command)) {
                const divs = document.querySelectorAll('.cell')
                const {index: indexString} = currentSelected.dataset
                if (!indexString) return
                const index = parseInt(indexString)
                currentSelected.classList.remove('selected')
                let nextIndex = 0
                if (command === 'up') nextIndex = index - 3 < 0 ? 0 : index - 3
                else if (command === 'down')
                    nextIndex = index + 3 > 80 ? 80 : index + 3
                else if (command === 'left')
                    nextIndex = index - 1 < 0 ? 0 : index - 1
                else nextIndex = index + 1 > 80 ? 80 : index + 1

                const nextCurrentSelected = divs[nextIndex] as HTMLDivElement
                nextCurrentSelected.classList.add('selected')
                nextCurrentSelected.dataset.index = `${nextIndex}`
            } else {
                currentSelected.innerText = command
            }
        }
    }

    removeKeyboardEffect(event: KeyboardEvent) {
        const {command} = getKeyboardCommand(event)
        if (command) {
            const keyElement = document.querySelector(`[data-key="${command}"]`)
            keyElement?.classList.remove('clicked')
        }
    }

    public addEvents(): void {
        const firstCell = document.querySelector('.cell') as HTMLDivElement
        if (firstCell) {
            firstCell.classList.add('selected')
            firstCell.dataset.index = '0'
        }
        document.addEventListener('keyup', this.removeKeyboardEffect)
        document.addEventListener('keydown', this.addKeyboardEffect)
        new Board(this.board).addEvents()
    }

    render(): string {
        return `
            <div class="main">
                ${new Board(this.board).render()}
                <div class="controls">
                    <div class="numbers">
                        <div data-key="7" class="number">7</div>
                        <div data-key="8" class="number">8</div>
                        <div data-key="9" class="number">9</div>
                        <div data-key="4" class="number">4</div>
                        <div data-key="5" class="number">5</div>
                        <div data-key="6" class="number">6</div>
                        <div data-key="1" class="number">1</div>
                        <div data-key="2" class="number">2</div>
                        <div data-key="3" class="number">3</div>
                    </div>
                    <div class="keyboard">
                        <div data-key="up" class="key">Up</div>
                        <div data-key="left" class="key">Left</div>
                        <div data-key="down" class="key">Down</div>
                        <div data-key="right" class="key">Right</div>
                    </div>
                </div>
            </div>
        `
    }
}
