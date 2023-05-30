import { Scene, StateMachine } from '@/engine'
import { BitmapText, Sprite } from "pixi.js"

import { Match } from "./match"
import { OpponentTurnState, PlayerTurnState, WinnerState } from './SceneStates'

import View from "./View"
import Assets from './Assets'

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
            new PlayerTurnState(this),
            new OpponentTurnState(this),
            new WinnerState(this),
        ])

        this.match = this.watch(new Match(), {
            '*': () => this.onMatchChanged(),
        })
        this.onMatchChanged()
    }

    private onMatchChanged() {
        this.sm.update()
        this.field.setCells(this.match.grid)
    }

}