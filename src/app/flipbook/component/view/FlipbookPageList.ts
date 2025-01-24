import { Viewable } from "../../../../library/observer/Viewable.js";
import injector from "../../../injector/Injector.js";
import { FlipbookController } from "../controller/FlipbookController.js";
import { FlipbookEvent, FlipbookEventType } from "../model/FlipbookEvent.js";

export class FlipbookPageList implements Viewable<FlipbookEvent> {
  private container: HTMLElement;
  private pageList: {name: string, id: string}[];

  constructor(
    private controller: FlipbookController,
    private htmlService = injector.getHtmlService()
  ) {
    this.pageList = [];
    this.container = this.htmlService.create("div", ["flipbook__pages"]);
    const addButton: HTMLButtonElement = this.htmlService.create("button", ["button"]);
    addButton.textContent = "+Page";
    addButton.addEventListener("click", (e) => this.controller.addPage())
    this.container.appendChild(addButton);
    
  }

  get component(): HTMLElement {
    return this.container;
  }
  onChange(event: FlipbookEvent): void {
    switch(event.type) {
      case FlipbookEventType.START:
        this.pageList = event.pages;
        // TODO make a thumbnail for each page
        break;
      case FlipbookEventType.PAGE_CREATED:
        // TODO add to the list of pages
        break;
      default:
        break;
    }
  }
}