import { Player, ResetAction } from "../match"
import { SceneState } from "./SceneStates"
import * as Strings from '@/assets/strings/en_US.json'

export class WinnerState extends SceneState {

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
                text = Strings.tie
                font = 'darkFont'
                break
        }

        this.scene.heading.text = text
        this.scene.heading.fontName = font

        for (const i of this.match.winnerPattern!) {
            const cell = this.scene.field.getChildAt(i)
            cell.setGlow(true)
            cell.spine.state.setAnimation(0, 'win', false)
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