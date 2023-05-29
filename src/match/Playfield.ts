import { Player } from "./Player"
import { Status } from "./Status"

export class Playfield {
    public status = Status.ONGOING
    public currentTurn = Player.CROSS
    public grid = [
        null, null, null,
        null, null, null,
        null, null, null,
    ]
}