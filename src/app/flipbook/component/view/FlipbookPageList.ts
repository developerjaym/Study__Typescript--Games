import { Viewable } from "../../../../library/observer/Viewable.js";
import injector from "../../../injector/Injector.js";
import { FlipbookController } from "../controller/FlipbookController.js";
import { FlipbookEvent } from "../model/FlipbookEvent.js";

export class FlipbookPageList implements Viewable<FlipbookEvent> {
  private container: HTMLElement;

  constructor(
    private controller: FlipbookController,
    private htmlService = injector.getHtmlService()
  ) {
    this.container = this.htmlService.create("div", ["flipbook__pages"]);
    
    
  }

  get component(): HTMLElement {
    return this.container;
  }
  onChange(event: FlipbookEvent): void {
  }
}