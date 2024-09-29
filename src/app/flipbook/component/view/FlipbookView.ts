import { Viewable } from "../../../../library/observer/Viewable.js";
import injector from "../../../injector/Injector.js";
import { FlipbookController } from "../controller/FlipbookController.js";
import { FlipbookEvent, FlipbookEventType } from "../model/FlipbookEvent.js";
import { FlipbookCanvasUI } from "./FlipbookCanvasUI.js";

export class FlipbookView implements Viewable<FlipbookEvent> {
    private container: HTMLElement;
    private canvas: FlipbookCanvasUI;
    // private timerId: number;
    constructor(private controller: FlipbookController, private htmlService = injector.getHtmlService(), private soundEffectService = injector.getSoundEffectService()) {
        this.container = this.htmlService.create("main", ["flipbook__main"]);
        this.canvas = new FlipbookCanvasUI(this.controller);
        this.container.appendChild(this.canvas.component)
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
    stop(): void {
        // window.clearInterval(this.timerId);
    }
    onChange(event: FlipbookEvent): void {
        console.log('onChange')
        this.canvas.onChange(event)
        if(event.type === FlipbookEventType.SHOT_FIRED) {
            this.soundEffectService.get("assets/flipbook/shot.mp3").play()
        }
    }
}