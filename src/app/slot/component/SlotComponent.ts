import { Page } from "../../../library/observer/Page.js";
import { RouterEvent } from "../../../library/router/RouterEvent.js";
import { SlotController } from "./controller/SlotController.js";
import { SlotGame } from "./model/SlotGame.js";
import { SlotView } from "./view/SlotView.js";

export class SlotComponent implements Page {
    private model: SlotGame;
    private view: SlotView;
    private controller: SlotController;
    constructor() {
        this.model = new SlotGame()
        this.controller = new SlotController(this.model);
        this.view = new SlotView(this.controller)
        this.model.subscribe(this.view)
        this.model.start();
    }
    get stylesheet(): string[] {
        return ["slot.css"];
    }
    get component(): HTMLElement {
        return this.view.component
    }
    onDestroy(): void {
      
    }
    onChange(event: RouterEvent): void {
       
    }
    
}