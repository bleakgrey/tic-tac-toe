import { jsx } from '@/engine/Helpers'
import { Container, Sprite } from 'pixi.js'
import { Spine } from 'pixi-spine'
import Assets from '../Assets'
import { Player } from '../match'

export function Cell() {
    let sprite: Sprite

    const cell: any = <Container>
        <Sprite ref={el => sprite = el}
            texture={Assets.CELL}
            alpha={0}
        />
    </Container>

    cell.setGlow = (state: boolean) => {
        sprite.alpha = state == true ? 1 : 0
    }

    cell.undraw = (spine: Spine) => {
        spine.autoUpdate = false
        spine.state.setAnimation(0, 'draw', false)
        const track = spine.state.tracks[0]

        track.animationEnd += Math.random() * 0.5
        let time = track.animationEnd
        let interval = setInterval(() => {
            time -= 0.0125

            if (time <= 0) {
                clearInterval(interval)
                cell.removeChild(spine)
            }

            track.trackTime = 0
            spine.update(time)
        }, 10)
    }

    cell.draw = (symbol: any) => {
        if (symbol == cell.symbol)
            return
        cell.symbol = symbol

        let spine = cell.spine as Spine
        if (spine) {
            cell.undraw(spine)
        }

        let asset
        switch (symbol) {
            case Player.CIRCLE:
                asset = Assets.CIRCLE
                break
            case Player.CROSS:
                asset = Assets.CROSS
                break
            default:
                return
        }

        cell.spine = <Spine
            asset={asset}
            visible={true}
            x={202 / 2}
            y={202 / 2}
        />
        cell.addChild(cell.spine)

        cell.spine.state.setAnimation(0, 'draw', false)
    }

    return cell
}