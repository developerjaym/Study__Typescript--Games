import injector from "../../../injector/Injector.js";
import { WinningsDrawer } from "./WinningsDrawer.js";

export class ChipWinningsDrawer implements WinningsDrawer {
    constructor(private htmlService = injector.getHtmlService()) {

    }
    draw(winnings: number): HTMLElement {
        const container = this.htmlService.create("div", ["chip-area"])

        // draw stacked chips?

        return container;
    }
    
}