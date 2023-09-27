import { Viewable } from "../../../../library/observer/Viewable.js";
import injector from "../../../injector/Injector.js";
import { SlotController } from "../controller/SlotController.js";
import { SlotEvent } from "../event/SlotEvent.js";

export class SlotView implements Viewable<SlotEvent>{
    constructor(private controller: SlotController, private htmlService = injector.getHtmlService()) {

    }
    get component(): HTMLElement {
        return this.htmlService.create("p", [], crypto.randomUUID(), "Slot Machine")
    }
    onChange(event: SlotEvent): void {
       console.log("SlotView.onChange", event);
    }
    
}