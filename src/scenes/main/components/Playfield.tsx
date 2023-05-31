import { jsx } from '@/engine/Helpers'
import { Sprite } from 'pixi.js'
import { Cell } from './Cell'
import Assets from '../Assets'

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
            cell.draw(symbol)
        }
    }

    return view
}