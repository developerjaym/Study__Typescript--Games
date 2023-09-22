import { SystemIcon } from "../../../../library/SystemIcon.js";
import { Viewable } from "../../../../library/observer/Viewable.js";
import { HTMLService } from "../../../../library/service/HTMLService.js";
import { URLService } from "../../../../library/service/URLService.js";
import injector from "../../../injector/Injector.js";
import { IController } from "../controller/IController.js";
import { UserEventType } from "../controller/UserEvent.js";
import { GameEvent, GameEventType } from "../model/GameEvent.js";
import { rules } from "./text/Rules.js";

export class ControlsUI implements Viewable<GameEvent> {
  private helpDialogShown = false;
  private undoButton: HTMLElement;
  private container: HTMLElement;
  constructor(
    private controller: IController,
    private htmlService: HTMLService = injector.getHtmlService(),
    private urlService: URLService = injector.getURLService(),
    private dialogService = injector.getDialogService()
  ) {
    this.container = this.htmlService.create(
      "section",
      ["controls"],
      "controls"
    );
    this.undoButton = this.htmlService.create(
      "button",
      ["button", "button--game"],
      "undoButton",
      "Undo"
    );
    this.undoButton.addEventListener("click", () =>
      this.controller.onEvent({ type: UserEventType.UNDO })
    );
    const endGameButton = this.htmlService.create(
      "button",
      ["button", "button--game"],
      "endGameButton",
      "End Game"
    );
    endGameButton.addEventListener("click", () =>
      this.controller.onEvent({ type: UserEventType.END_GAME })
    );
    const helpButton = this.htmlService.create(
      "button",
      ["button", "button--game"],
      "helpButton",
      "Help"
    );
    helpButton.addEventListener("click", () => this.showHelpDialog());

    this.container.append(this.undoButton, endGameButton, helpButton);
  }
  get component(): HTMLElement {
    return this.container;
  }
  onChange(event: GameEvent): void {
    if (event.type === GameEventType.START && !this.helpDialogShown) {
      this.showHelpDialog();
      this.helpDialogShown = true;
    }
    this.undoButton.removeAttribute("disabled");
  }
  private showHelpDialog() {
    this.dialogService.showDialog("Help", rules, SystemIcon.HELP);
  }
  // TODO show a button/dialog to create an online game
}
