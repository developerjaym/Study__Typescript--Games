import { GameComponent } from "./component/GameComponent.js"
import injector from "./injector/Injector.js"

// Bootstrap injector (including environment loader)
(() => {
    injector.initialize()
    .then(() => {
        const component = new GameComponent()
        injector.getHtmlService().append(component.component)
    })
})()