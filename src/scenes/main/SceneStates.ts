import { State } from "@/engine"
import { Player } from "./match"
import { PlayerTurnAction } from "./match/actions/PlayerTurn"
import { ResetAction } from "./match/actions/Reset"
import Opponent from './match/Opponent?worker'
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

    affectedCells = []

    canEnter() {
        return this.match?.winner != undefined
    }

    onEnter() {
        let text, font

        switch (this.match.winner) {
            case Player.CROSS:
                text = Strings.cross_win
                font = 'darkFont'
                break;
            case Player.CIRCLE:
                text = Strings.circle_win
                font = 'lightFont'
                break
            default:
                text = Strings.draw
                font = 'lightFont'
                break
        }

        this.scene.heading.text = text
        this.scene.heading.fontName = font

        for (const i of this.match.winnerPattern!) {
            const cell = this.scene.field.getChildAt(i)
            cell.setGlow(true)
            this.affectedCells.push(cell)
        }

        setTimeout(() => {
            this.match.commit(new ResetAction(null))
        }, 2000)
    }

    onLeave() {
        this.scene.heading.text = ''
        this.affectedCells.forEach(cell => cell.setGlow(false))
    }

}

export class PlayerTurnState extends SceneState implements State {

    symbol = Player.CROSS
    affectedCells = []

    canEnter() {
        return this.match?.currentTurn == this.symbol
    }

    onEnter() {
        for (const i in this.match.grid) {
            const symbol = this.match.grid[i]
            const cell = this.scene.field.getChildAt(i)

            if (!symbol) {
                this.affectedCells.push(cell)
                cell.interactive = true
                cell.buttonMode = true

                cell.on('pointerdown', () => this.onCellClicked(cell))
            }
        }
    }

    onCellClicked(cell) {
        const action = new PlayerTurnAction({
            symbol: this.symbol,
            cellIndex: cell.parent.getChildIndex(cell),
        })
        this.match.commit(action)
    }

    onLeave() {
        for (const cell of this.affectedCells) {
            cell.removeAllListeners('pointerdown')
            cell.buttonMode = false
        }
    }

}

export class OpponentTurnState extends SceneState implements State {

    symbol = Player.CIRCLE
    opponent = Player.CROSS

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
        worker.postMessage({
            symbol: this.symbol,
            opponent: this.opponent,
            match: JSON.stringify(this.match),
        })
    }

    onLeave() { }

}