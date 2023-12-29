import { Viewable } from "../../../../library/observer/Viewable.js";
import injector from "../../../injector/Injector.js";
import { HuntController } from "../controller/HuntController.js";
import { HuntEvent } from "../model/HuntEvent.js";
import { HuntCanvasUI } from "./HuntCanvasUI.js";

export class HuntView implements Viewable<HuntEvent> {
    private container: HTMLElement;
    private canvas: HuntCanvasUI;
    private timerId: number;
    constructor(private controller: HuntController, private htmlService = injector.getHtmlService()) {
        this.container = this.htmlService.create("main", ["hunt__main"]);
        this.canvas = new HuntCanvasUI(this.controller);
        this.container.appendChild(this.canvas.component)
        this.timerId = window.setInterval(() => this.controller.onTick(), 10_000)
    }
    get component(): HTMLElement {
        return this.container;
    }
    onChange(event: HuntEvent): void {
        this.canvas.onChange(event)
    }
}