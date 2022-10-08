export type HTMLString = string
export abstract class Component<P = any> {
    props?: P
    constructor(props?: P) {
        this.props = props
    }
    public abstract render(): HTMLString
}
export abstract class FunctionalComponent<P = any> extends Component<P> {
    constructor(props?: P) {
        super(props)
    }
    public abstract addEvents(): void
}
