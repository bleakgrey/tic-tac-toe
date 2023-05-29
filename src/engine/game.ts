import * as PIXI from 'pixi.js'

interface IGameOptions {
    baseWidth: number,
    baseHeight: number,
}

export class Game extends PIXI.Application {

    constructor(config: PIXI.IApplicationOptions & IGameOptions) {
        super(config)
    }

}