export type HTMLString = string
export abstract class Component<P = any> {
    props?: P
    constructor(props?: P) {
        this.props = props
    }
    abstract render(): HTMLString
}
export abstract class FunctionalComponent<P = any> extends Component<P> {
    constructor(props?: P) {
        super(props)
    }
    abstract addEvents(): void
}
