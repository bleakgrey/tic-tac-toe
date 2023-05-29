import { Game } from "./engine/game"

const container = document.getElementById('app')!

export const gameInstance = new Game({
    baseWidth: 1920,
    baseHeight: 1080,
    resizeTo: container,
    antialias: true,
    backgroundColor: 0x00c1ac,
})

container.appendChild(gameInstance.view)