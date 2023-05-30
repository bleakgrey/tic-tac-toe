import { Action, SolvableState } from "../../../engine/solver"
import { ChangeTurnAction } from "./actions/ChangeTurn"
import { CheckWinnerAction } from "./actions/CheckWinner"
import { PlayerTurnAction } from "./actions/PlayerTurn"
import { Player } from "./Player"

const CHANGE_TURN = new ChangeTurnAction(null)
const CHECK_WINNER = new CheckWinnerAction(null)

export class Match extends SolvableState {

    public grid: (Player | null)[] = [
        null, null, null,
        null, null, null,
        null, null, null,
    ]

    public currentTurn = Player.CROSS

    public winner: Player | undefined | 'draw'
    public winnerPattern: (number[] | null) = null

    override clone(): Match {
        const state = new Match()
        state.grid = [...this.grid]
        state.currentTurn = this.currentTurn
        state.winner = this.winner
        state.winnerPattern = this.winnerPattern == null ? null : [...this.winnerPattern]
        return state
    }

    public override onActionApplied(action: Action<this, any>): void {
        if (action instanceof PlayerTurnAction) {
            this.commit(CHECK_WINNER)
            this.commit(CHANGE_TURN)
        }
    }

    public isEmpty(): boolean {
        for (const cell of this.grid) {
            if (cell != null)
                return false
        }

        return true
    }

}