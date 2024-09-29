import { Viewable } from "../../../../library/observer/Viewable.js";
import injector from "../../../injector/Injector.js";
import { FlipbookController } from "../controller/FlipbookController.js";
import { FlipbookEvent, FlipbookEventType } from "../model/FlipbookEvent.js";
import { FlipbookCanvasUI } from "./FlipbookCanvasUI.js";
import { FlipbookPageList } from "./FlipbookPageList.js";

export class FlipbookView implements Viewable<FlipbookEvent> {
    private container: HTMLElement;
    private canvas: FlipbookCanvasUI;
    private pageList: FlipbookPageList;

    constructor(private controller: FlipbookController, private htmlService = injector.getHtmlService(), private soundEffectService = injector.getSoundEffectService()) {
        this.container = this.htmlService.create("main", ["flipbook__main"]);
        this.pageList = new FlipbookPageList(this.controller);
        this.container.appendChild(this.pageList.component);
        this.canvas = new FlipbookCanvasUI(this.controller);
        this.container.appendChild(this.canvas.component);
        // this.timerId = window.setInterval(() => this.controller.onTick(), 1_00)
        // I want a vertical pane on the left that shows thumbnails of the 'pages'
        // I want a toolbar on the right that shows tools
            // I need a place to manipulate movie-level stuff (frame rate, movie name, save)
            // I need a place to manipulate character-level stuff
            // I need a place to manipulate page-level stuff (set background, add character, etc)
            // I probably need more
        // I want a full-size display of the focused 'page' in the middle
            // I want an easy way to move the things on the 'page' (drag characters, etc)
            // I want an easy way to move the parts of the character (rotate arms, etc)
        // I also want a full-screen 'show' mode (where I can see the real video)
            // I want it to have the usual video controls (play/pause) 
    }
    get component(): HTMLElement {
        return this.container;
    }
    onChange(event: FlipbookEvent): void {
        this.canvas.onChange(event)
    }
}