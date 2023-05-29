import { Player } from "./Player"

export class Match {
    public grid = [
        null, null, null,
        null, null, null,
        null, null, null,
    ]

    public currentTurn = Player.CROSS
    public winner: Player | undefined
}