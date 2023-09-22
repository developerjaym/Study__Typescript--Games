import { Viewable } from "../../../library/observer/Viewable.js";
import injector from "../../injector/Injector.js";
import { GameController } from "./controller/GameController.js";
import { Game } from "./model/Game.js";
import { GameEvent } from "./model/GameEvent.js";
import { GameState } from "./model/GameState.js";
import { GameView } from "./view/GameView.js";

export class GameComponent implements Viewable<GameEvent> {
  private model;
  private view;
  constructor(
    gameState: GameState | null,
    private urlService = injector.getURLService(),
    private storageService = injector.getGBPStorageService()
  ) {
    this.model = new Game(gameState);
    let gameController = new GameController(this.model);
    this.view = new GameView(gameController);
    this.model.subscribe(this.storageService);
    this.model.subscribe(this.view);
    this.model.start();
  }
  get component(): HTMLElement {
    return this.view.component;
  }
  onChange(event: GameEvent): void {}
}
