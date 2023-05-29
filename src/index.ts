import { Game } from "./engine/Game"
import MainScene from "./scenes/main/MainScene"

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