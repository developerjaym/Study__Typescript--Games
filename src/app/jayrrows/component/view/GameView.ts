
import { SystemIcon } from "../../../../library/SystemIcon.js";
import { Viewable } from "../../../../library/observer/Viewable.js";
import { HTMLService } from "../../../../library/service/HTMLService.js";
import { DialogService } from "../../../../library/service/dialog/DialogService.js";
import injector from "../../../injector/Injector.js";
import { IController } from "../controller/IController.js";
import { UserEventType } from "../controller/UserEvent.js";
import { GameEvent, GameEventType } from "../model/GameEvent.js";
import { BoardUI } from "./BoardUI.js";
import { ControlsUI } from "./ControlsUI.js";

export class GameView implements Viewable<GameEvent> {
  board: BoardUI;
  controls: ControlsUI;
  container: HTMLElement;
  constructor(
    private controller: IController,
    private htmlService: HTMLService = injector.getHtmlService(),
    private dialogService: DialogService = injector.getDialogService()
  ) {
    // TODO, create the HTML elements
    this.container = this.htmlService.create("main", ["game__main"], "main");
    // create controls (help, undo, end game)
    this.controls = new ControlsUI(this.controller);
    this.container.append(this.controls.component);
    // create board
    this.board = new BoardUI(this.controller);
    this.container.append(this.board.component);
  }
  get component(): HTMLElement {
    return this.container;
  }
  onChange(event: GameEvent): void {
    if(event.type === GameEventType.END) {
      this.dialogService.showDialog("Game Over", event.message, SystemIcon.CELEBRATE, () => this.controller.onEvent({type: UserEventType.END_GAME}))
      return
    }
    this.controls.onChange(event);
    this.board.onChange(event);
  }
}
