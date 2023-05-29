import { Container } from 'pixi.js'

export abstract class Scene extends Container {

    constructor() {
        super()
    }

    public getView(): Container

    public onStart() { }
    public onStop() { }

}