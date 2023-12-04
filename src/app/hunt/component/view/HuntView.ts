import { Viewable } from "../../../../library/observer/Viewable.js";
import injector from "../../../injector/Injector.js";
import { HuntController } from "../controller/HuntController.js";
import { HuntEvent } from "../model/HuntEvent.js";

export class HuntView implements Viewable<HuntEvent> {
    private container: HTMLElement;
    constructor(private controller: HuntController, private htmlService = injector.getHtmlService()) {
        this.container = this.htmlService.create("main", ["hunt__main"]);

    }
    get component(): HTMLElement {
        return this.container;
    }
    onChange(event: HuntEvent): void {
        console.log('hunt event', event);
        
    }
}