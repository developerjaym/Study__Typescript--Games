import { GameComponent } from "./game/GameComponent.js"
import injector from "./service/Injector.js"

// Bootstrap injector (including environment loader)
(() => {
    injector.initialize()
    .then(done => {
        const component = new GameComponent()
        injector.getHtmlService().append(component.component)
    })
})()