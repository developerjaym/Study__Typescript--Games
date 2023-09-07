import injector from "../service/Injector.js";
import { GameController } from "./controller/GameController.js";
import { IController } from "./controller/IController.js";
import { RemoteController } from "./controller/RemoteController.js";
import { RemoteListener } from "./controller/remote/RemoteListener.js";
import { RemoteSender } from "./controller/remote/RemoteSender.js";
import { Game } from "./model/Game.js";
import { GameEvent } from "./model/GameEvent.js";
import { GameView } from "./view/GameView.js";
import { Viewable } from "./view/Viewable.js";

export class GameComponent implements Viewable {
  private model;
  private view;
  constructor(private urlService = injector.getURLService()) {
    this.model = new Game();
    let gameController = new GameController(this.model);
    
    if(this.urlService.getSearchParam("hostId")) {
        // must be a remote game
        const remoteListener = new RemoteListener(gameController)
        const remoteController = new RemoteController(gameController, new RemoteSender())
        remoteListener.start()
        // TODO load initial data
        this.view = new GameView(remoteController);
    } else {
      this.view = new GameView(gameController)
    }
    this.model.subscribe(this.view);
    this.model.start();
    
  }
  get component(): HTMLElement {
    return this.view.component;
  }
  onChange(event: GameEvent): void {}
}
