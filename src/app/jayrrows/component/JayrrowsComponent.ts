import { Page } from "../../../library/observer/Page.js";
import { RouterEvent } from "../../../library/router/RouterEvent.js";
import { GameController } from "./controller/GameController.js";
import { Game } from "./model/Game.js";
import { GameEvent } from "./model/GameEvent.js";
import { GameView } from "./view/GameView.js";

export class JayrrowsComponent implements Page {
  private model;
  private view;
  constructor() {
    this.model = new Game();
    let gameController = new GameController(this.model);

    this.view = new GameView(gameController);

    this.model.subscribe(this.view);
    this.model.start();
  }
  get component(): HTMLElement {
    return this.view.component;
  }
  get stylesheet(): string[] {
    return ["boardgame.css", "jayrrows.css"]
  }
  onChange(event: RouterEvent): void {}
}
