import { Page } from "../../../library/observer/Page.js";
import { RouterEvent } from "../../../library/router/RouterEvent.js";
import injector from "../../injector/Injector.js";
import { GameController } from "./controller/GameController.js";
import { Game } from "./model/Game.js";
import { GameState } from "./model/GameState.js";
import { GameView } from "./view/GameView.js";

export class WuziqiComponent implements Page {
  private model;
  private view;
  constructor(
    gameState: GameState | null,
    private storageService = injector.getWuziqiStorageService()
  ) {
    this.model = new Game(gameState);
    let gameController = new GameController(this.model);
    this.view = new GameView(gameController);
    this.model.subscribe(this.storageService);
    this.model.subscribe(this.view);
  }
  onInit(): void {
    this.model.start();
  }
  onDestroy(): void {}
  get component(): HTMLElement {
    return this.view.component;
  }
  get stylesheet(): string[] {
    return ["boardgame.css", "wuziqi.css"];
  }
  onChange(event: RouterEvent): void {}
}
