import { Game } from "./engine/game"
import MainScene from "./scene/main/scene"

const container = document.getElementById('app')!

export const gameInstance = new Game({
    baseWidth: 1920,
    baseHeight: 1080,
    resizeTo: container,
    antialias: true,
    backgroundColor: 0x00c1ac,
    startScene: new MainScene(),
})

container.appendChild(gameInstance.view)