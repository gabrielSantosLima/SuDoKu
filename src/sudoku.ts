import {Main} from './components/Main'

export class Sdk {
    private render() {
        const app = document.querySelector('#app')
        if (app) app.innerHTML = new Main().render()
    }

    private addEvents() {
        new Main().addEvents()
    }

    init() {
        this.render()
        this.addEvents()
    }
}
