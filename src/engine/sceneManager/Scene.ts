import { Container } from 'pixi.js'

export abstract class Scene extends Container {

    view: Container

    constructor() {
        super()
        this.view = this.addChild(this.getView())
    }

    public getView(): Container

    public onStart() { }
    public onStop() { }

}