import { State } from "@/engine"
import { Player } from "./match"
import MainScene from "./Scene"

import * as Strings from '@/assets/strings/en_US.json'

class SceneState {
    protected scene: MainScene
    protected get match() {
        return this.scene.match
    }

    constructor(scene: MainScene) {
        this.scene = scene
    }
}

export class WinnerState extends SceneState implements State {

    canEnter() {
        return this.match?.winner != undefined
    }

    onEnter() {
        let text = Strings.cross_win
        let font = 'darkFont'

        if (this.match.winner == Player.CIRCLE) {
            text = Strings.circle_win
            font = 'lightFont'
        }

        this.scene.heading.text = text
        this.scene.heading.fontName = font
    }

    onLeave() { }

}

export class PlayerTurnState extends SceneState implements State {

    canEnter() {
        return this.match?.currentTurn == Player.CROSS
    }

    onEnter() {
        this.scene.heading.text = 'Select cell'
    }

    onLeave() {

    }

}

export class OpponentTurnState extends SceneState implements State {

    canEnter() {
        return false
    }

    onEnter() {
        this.scene.heading.text = '...'
    }

    onLeave() {

    }

}