import { jsx } from '../../engine/Helpers'
import { Sprite } from 'pixi.js'
import Assets from './Assets'

export function Playfield() {
    const cellSize = 202
    const cellMargin = 17
    const gridSize = 3

    const view = <Sprite texture={Assets.GRID}>

    </Sprite>

    view.cells = []
    for (const i of [...Array(9).keys()]) {
        const cell = <Sprite
            texture={Assets.CELL}
            x={i % gridSize * (cellSize + cellMargin)}
            y={Math.floor(i / gridSize) * (cellSize + cellMargin)}
        />
        view.addChild(cell)
        view.cells.push(cell)
    }

    return view
}