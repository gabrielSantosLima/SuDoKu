import {Board as BoardEntity, unitedBoardToBoard} from '../../entities/Board'
import {UnitedBoard} from '../../entities/UnitedBoard'
import {generateResultWithSeedFactory} from '../../factory/generateResultWithSeedFactory'
import {CompareResult} from '../../game/CompareResult'
import {Board} from '../Board'
import {FunctionalComponent} from '../Component'
import './styles.css'

const arrowCommands: any = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    Enter: 'enter',
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
    private seed: string

    constructor() {
        super()
        const generateResult = generateResultWithSeedFactory()
        this.seed = new Date().toDateString()
        this.board = generateResult.execute(this.seed)
    }

    private onArrowCommand(command: string) {
        function getNextIndex(
            command: 'up' | 'down' | 'left' | 'right',
            index: number
        ) {
            const actions = {
                up: (index: number) => (index - 3 < 0 ? 0 : index - 3),
                down: (index: number) => (index + 3 > 80 ? 80 : index + 3),
                left: (index: number) => (index - 1 < 0 ? 0 : index - 1),
                right: (index: number) => (index + 1 > 80 ? 80 : index + 1),
            }
            return actions[command](index)
        }

        if (!Object.values(arrowCommands).includes(command)) return

        if (command == 'enter') {
            let unitedBoard: UnitedBoard = []
            let currentIndex = 0
            const divs = document.querySelectorAll('.cell')
            for (let row = 0; row < 9; row++) {
                unitedBoard.push([])
                for (let column = 0; column < 9; column++) {
                    const div = divs[currentIndex] as HTMLDivElement
                    unitedBoard[row].push(parseInt(div.innerText) || 0)
                    currentIndex++
                }
            }
            if (
                new CompareResult().execute({
                    board1: this.board,
                    board2: unitedBoardToBoard(unitedBoard),
                })
            ) {
                alert('Você ganhou! :D')
                return
            }
            document.querySelector('.board')?.classList.add('shake')
            setTimeout(
                () =>
                    document.querySelector('.board')?.classList.remove('shake'),
                500
            )
            return
        }

        const currentSelected = document.querySelector(
            '.selected'
        ) as HTMLDivElement
        const divs = document.querySelectorAll('.cell')
        const {index: indexString} = currentSelected.dataset
        if (!indexString) return
        const index = parseInt(indexString)
        currentSelected.classList.remove('selected')
        let nextIndex = getNextIndex(
            command as 'up' | 'down' | 'left' | 'right',
            index
        )
        const nextCurrentSelected = divs[nextIndex] as HTMLDivElement
        nextCurrentSelected.classList.add('selected')
        nextCurrentSelected.dataset.index = `${nextIndex}`
    }

    private onNumberCommand(command: string) {
        if (!Object.values(numberCommands).includes(command)) return
        const currentSelected = document.querySelector(
            '.selected'
        ) as HTMLDivElement
        currentSelected.innerText = command
    }

    private addKeyboardEffect(command: string) {
        const keyElement = document.querySelector(`[data-key="${command}"]`)
        keyElement?.classList.add('clicked')
    }

    private removeKeyboardEffect(command: string) {
        const keyElement = document.querySelector(`[data-key="${command}"]`)
        keyElement?.classList.remove('clicked')
    }

    private onLoad() {
        const firstCell = document.querySelector('.cell') as HTMLDivElement
        if (firstCell) {
            firstCell.classList.add('selected')
            firstCell.dataset.index = '0'
        }
    }

    addEvents(): void {
        this.onLoad()
        document.addEventListener('keydown', event => {
            const {command} = getKeyboardCommand(event)
            if (!command) return
            this.addKeyboardEffect(command)
            this.onArrowCommand(command)
            this.onNumberCommand(command)
        })
        document.addEventListener('keyup', event => {
            const {command} = getKeyboardCommand(event)
            if (!command) return
            this.removeKeyboardEffect(command)
        })
    }

    render(): string {
        return `
            <div class="main">
                ${new Board(this.board, 4).render()}
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
                    <div data-key="left" class="key">Left</div>
                        <div data-key="up" class="key">Up</div>
                        <div data-key="right" class="key">Right</div>
                        <div data-key="down" class="key">Down</div>
                        <div data-key="enter" class="key">Enter</div>
                    </div>
                </div>
            </div>
        `
    }
}
