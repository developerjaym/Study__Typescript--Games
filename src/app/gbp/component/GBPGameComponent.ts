import { Page } from "../../../library/observer/Page.js";
import { RouterEvent } from "../../../library/router/RouterEvent.js";
import injector from "../../injector/Injector.js";
import { GameController } from "./controller/GameController.js";
import { Game } from "./model/Game.js";
import { GameState } from "./model/GameState.js";
import { GameView } from "./view/GameView.js";

export class GBPComponent implements Page {
  private model;
  private view;
  constructor(
    gameState: GameState | null,
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
  get stylesheet(): string[] {
    return ["boardgame.css", "gbp.css"];
  }
  onChange(event: RouterEvent): void {}
}
