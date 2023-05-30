import { jsx } from '@/engine/Helpers'
import { Container, Sprite } from 'pixi.js'
import { Spine } from 'pixi-spine'
import Assets from './Assets'
import { Player } from './match'

function Cell() {
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

    cell.setSymbol = (symbol: any) => {
        if (symbol == cell.symbol)
            return
        cell.symbol = symbol

        let spine = cell.children.find(c => c instanceof Spine)
        if (spine) {
            cell.removeChild(spine)
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

        spine = <Spine
            asset={asset}
            visible={true}
            x={202 / 2}
            y={202 / 2}
        />
        cell.addChild(spine)

        spine.state.setAnimation(0, 'draw', false)
    }

    return cell
}

export function Playfield() {
    const cellSize = 202
    const cellMargin = 17
    const gridSize = 3

    const view = <Sprite texture={Assets.GRID} />

    view.cells = []
    for (const i of [...Array(9).keys()]) {
        const cell = <Cell
            x={i % gridSize * (cellSize + cellMargin)}
            y={Math.floor(i / gridSize) * (cellSize + cellMargin)}
        />
        view.addChild(cell)
        view.cells.push(cell)
    }

    view.setCells = (grid: any[]) => {
        for (const i in grid) {
            const symbol = grid[i]

            const cell = view.getChildAt(i)
            cell.setSymbol(symbol)
        }
    }

    return view
}