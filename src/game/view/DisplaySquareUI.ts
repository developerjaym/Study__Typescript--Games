import { HTMLService } from "../../service/HTMLService.js";
import injector from "../../service/Injector.js";
import { Environment } from "../../service/environment/Environment.js";
import { IController } from "../controller/IController.js";
import { UserEventType } from "../controller/UserEvent.js";
import { GameEvent } from "../model/GameEvent.js";
import { Square } from "../model/Square.js";
import { Viewable } from "./Viewable.js";
import { SquareDrawer } from "./drawer/square/SquareDrawer.js";
import { isRemoteTurnNext } from "./remoteUtilities.js";

export class DisplaySquareUI implements Viewable {
  container: HTMLElement;
  displaySquare: HTMLElement;
  constructor(
    private controller: IController,
    private htmlService: HTMLService = injector.getHtmlService(),
    private env: Environment = injector.getEnvironment(),
    private squareDrawer: SquareDrawer = injector.getSquareDrawer()
  ) {
    this.container = this.htmlService.create("section", [
      "displaySquareContainer",
    ]);
    this.displaySquare = this.htmlService.create(
      "button",
      ["square"],
      "displaySquare"
    );
    const squareWidth = `calc((100vmin - (100vmin / ${this.env.width - 4})) / ${
      this.env.width
    })`;
    this.displaySquare.style.height = squareWidth;
    this.displaySquare.style.width = squareWidth;
    this.container.style.height = squareWidth;
    this.container.appendChild(this.displaySquare);
  }
  get component(): HTMLElement {
    return this.container;
  }
  onChange(event: GameEvent): void {
    this.squareDrawer.draw(event.displaySquare, this.displaySquare);
  }
}
