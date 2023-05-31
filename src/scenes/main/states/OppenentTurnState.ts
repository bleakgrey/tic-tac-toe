import { SceneState } from "./SceneStates"
import { Player, PlayerTurnAction } from "../match"
import Opponent from '../match/Opponent?worker'

export class OpponentTurnState extends SceneState {

    symbol = Player.CIRCLE
    opponent = Player.CROSS
    delay = 0.5 * 1000

    canEnter() {
        return this.match?.currentTurn == this.symbol
    }

    onEnter() {
        const worker = new Opponent()
        worker.onmessage = (ev) => {
            const action = new PlayerTurnAction({
                symbol: this.symbol,
                cellIndex: ev.data,
            })
            this.match.commit(action)
        }

        setTimeout(() => {
            worker.postMessage({
                self: this.symbol,
                opponent: this.opponent,
                grid: this.match.grid,
            })
        }, this.delay)
    }

}