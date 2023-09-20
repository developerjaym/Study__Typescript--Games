import { HTMLService } from "../../../service/HTMLService.js";
import injector from "../../injector/Injector.js";
import { IController } from "../controller/IController.js";
import { UserEventType } from "../controller/UserEvent.js";
import { GameEvent, GameEventType } from "../model/GameEvent.js";
import { BoardUI } from "./BoardUI.js";
import { ControlsUI } from "./ControlsUI.js";
import { DisplaySquareUI } from "./DisplaySquareUI.js";
import { Icon } from "./Icon.js";
import { PlayerDataDisplay } from "./PlayerDataDisplay.js";
import { Viewable } from "../../../observer/Viewable.js";

export class GameView implements Viewable<GameEvent> {
  board: BoardUI;
  controls: ControlsUI;
  container: HTMLElement;
  displaySquare: DisplaySquareUI;
  playerOneData: PlayerDataDisplay;
  playerTwoData: PlayerDataDisplay;
  constructor(
    private controller: IController,
    private htmlService: HTMLService = injector.getHtmlService()
  ) {
    this.container = this.htmlService.create("main", ["game__main"], "main");
    // create controls (help, undo, end game)
    this.controls = new ControlsUI(this.controller);
    this.container.append(this.controls.component);
    // create board
    this.board = new BoardUI(this.controller);
    this.displaySquare = new DisplaySquareUI(this.controller)
    this.container.append(this.board.component);
    this.playerOneData = new PlayerDataDisplay(true)
    this.playerTwoData = new PlayerDataDisplay(false)
    const bottomContainer = this.htmlService.create("div", ["game__bottom"])
    bottomContainer.append(this.playerOneData.component, this.displaySquare.component, this.playerTwoData.component)
    this.container.append(bottomContainer)
  }
  get component(): HTMLElement {
    return this.container;
  }
  onChange(event: GameEvent): void {
    this.playerOneData.onChange(event)
    this.playerTwoData.onChange(event)
    if(event.type === GameEventType.END) {
      this.htmlService.showDialog("Game Over", event.message, Icon.CELEBRATE, () => this.controller.onEvent({type: UserEventType.END_GAME}))
      return
    }
    this.controls.onChange(event);
    this.board.onChange(event);
    this.displaySquare.onChange(event)
  }
}
