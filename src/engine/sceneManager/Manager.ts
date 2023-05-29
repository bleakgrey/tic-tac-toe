import { Container } from 'pixi.js'
import { GameConfig } from '../Game'
import { Scene } from './Scene'

export class SceneManager extends Container {

    static CHANGE_EVENT = 'changeScene'

    private currentScene?: Scene

    constructor(config: GameConfig) {
        super()
        this.on(SceneManager.CHANGE_EVENT, this.onStageChange, this)

        config.startScene && this.emit(SceneManager.CHANGE_EVENT, config.startScene)
    }

    private onStageChange(newScene: Scene) {
        console.log('Changing to scene:', newScene.constructor.name)

        if (this.currentScene) {
            this.currentScene.onStop()
            this.currentScene.parent.removeChild(this.currentScene)
        }

        newScene.setParent(this)
        this.currentScene = newScene
    }

}