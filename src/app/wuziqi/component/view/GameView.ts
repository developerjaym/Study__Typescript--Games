import { SystemIcon } from "../../../../library/SystemIcon.js";
import { Viewable } from "../../../../library/observer/Viewable.js";
import { HTMLService } from "../../../../library/service/HTMLService.js";
import injector from "../../../injector/Injector.js";
import { IController } from "../controller/IController.js";
import { GameEvent, GameEventType } from "../model/GameEvent.js";
import { BoardUI } from "./BoardUI.js";
import { ControlsUI } from "./ControlsUI.js";
import { DisplaySquareUI } from "./DisplaySquareUI.js";

export class GameView implements Viewable<GameEvent> {
  board: BoardUI;
  controls: ControlsUI;
  container: HTMLElement;
  displaySquare: DisplaySquareUI;
  constructor(
    private controller: IController,
    private htmlService: HTMLService = injector.getHtmlService(),
    private dialogService = injector.getDialogService()
  ) {
    this.container = this.htmlService.create("main", ["game__main"], "main");
    // create controls (help, undo, end game)
    this.controls = new ControlsUI(this.controller);
    this.container.append(this.controls.component);
    // create board
    this.board = new BoardUI(this.controller);
    this.displaySquare = new DisplaySquareUI();
    this.container.append(this.board.component);
    const bottomContainer = this.htmlService.create("div", ["game__bottom"]);
    bottomContainer.append(
      this.displaySquare.component,
    );
    this.container.append(bottomContainer);
  }
  get component(): HTMLElement {
    return this.container;
  }
  onChange(event: GameEvent): void {
    if (event.type === GameEventType.END) {
      this.dialogService.showDialog(
        "Game Over",
        event.message,
        SystemIcon.CELEBRATE,
      );
    }
    this.controls.onChange(event);
    this.board.onChange(event);
    this.displaySquare.onChange(event);
  }
}
