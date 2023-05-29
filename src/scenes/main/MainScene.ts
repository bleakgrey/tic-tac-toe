import View from "./MainView"
import Assets from './Assets'
import { Scene } from "../../engine/sceneManager/Scene"
import { MatchState } from "../../match/MatchState"

interface Mode {
    onEnter(): void
    onLeave(): void
}

export default class MainScene extends Scene {

    private field: any

    private matchState: MatchState

    constructor() {
        super(Assets, View)
        this.matchState = this.watch(new MatchState())
    }

    override onStart() {
        super.onStart()
        console.dir({
            field: this.field
        })
    }

}