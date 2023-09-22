import { Viewable } from "../../../library/observer/Viewable.js";
import { GameController } from "./controller/GameController.js";
import { Game } from "./model/Game.js";
import { GameEvent } from "./model/GameEvent.js";
import { GameView } from "./view/GameView.js";

export class JayrrowsComponent implements Viewable<GameEvent> {
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
  onChange(event: GameEvent): void {}
}
