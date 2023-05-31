import { jsx } from '@/engine/Helpers'
import { Container, Sprite } from 'pixi.js'
import { Spine } from 'pixi-spine'
import Assets from '../Assets'
import { Player } from '../match'
import gsap from 'gsap'

const PLAYER_SPINES = {
    [Player.CROSS]: Assets.CROSS,
    [Player.CIRCLE]: Assets.CIRCLE,
}

export function Cell() {
    let sprite!: Sprite

    const cell: any = <Container>
        <Sprite ref={el => sprite = el}
            texture={Assets.CELL}
            alpha={0}
        />
    </Container>

    const glowAnim = gsap.timeline({ paused: true })
        .fromTo(sprite, { alpha: 0 }, { alpha: 1, duration: 0.75 })

    cell.setGlow = (state: boolean) => {
        state == true ? glowAnim.play() : glowAnim.reverse()
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

    cell.draw = (symbol: Player) => {
        if (symbol == cell.symbol)
            return
        cell.symbol = symbol

        let spine = cell.spine as Spine
        if (spine) {
            cell.undraw(spine)
        }

        let asset = PLAYER_SPINES[symbol]
        if (!asset)
            return

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