import { HTMLService } from "../../service/HTMLService.js";
import injector from "../../service/Injector.js";
import { Environment } from "../../service/environment/Environment.js";
import { IController } from "../controller/IController.js";
import { GameEvent } from "../model/GameEvent.js";
import { Viewable } from "./Viewable.js";

export class DisplaySquareUI implements Viewable {
  container: HTMLElement;
  displaySquare: HTMLElement;
  constructor(
    private controller: IController,
    private htmlService: HTMLService = injector.getHtmlService(),
    private env: Environment = injector.getEnvironment(),
    private randomRollAnimationService = injector.getRandomRollAnimationService()
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
    this.displaySquare.draggable = true;
    this.container.style.height = squareWidth;
    this.container.appendChild(this.displaySquare);
  }
  get component(): HTMLElement {
    return this.container;
  }
  onChange(event: GameEvent): void {
    this.randomRollAnimationService.roll(event, this.displaySquare, this.container)
  }
  

}
