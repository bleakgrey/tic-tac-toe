import { Scene, StateMachine } from '../../engine'
import { BitmapText, Sprite } from "pixi.js"

import { Match } from "../../match/Match"

import View from "./View"
import Assets from './Assets'
import { OpponentTurnState, PlayerTurnState, WinnerState } from './SceneStates'

export default class MainScene extends Scene {

    public field: Sprite
    public heading: BitmapText

    public match: Match
    private sm: StateMachine

    constructor() {
        super(Assets, View)
    }

    override onStart() {
        super.onStart()

        this.sm = new StateMachine([
            new OpponentTurnState(this),
            new PlayerTurnState(this),
            new WinnerState(this),
        ])

        this.match = this.watch(new Match(), {
            '*': () => this.sm.update(),
        })
    }

}