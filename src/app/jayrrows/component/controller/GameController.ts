import { Game } from "../model/Game.js";
import { IController } from "./IController.js";
import { UserEvent, UserEventType } from "./UserEvent.js";

export class GameController implements IController{
  constructor(private game: Game) {}
  onEvent(event: UserEvent) {
    switch(event.type) {
      case UserEventType.SELECT:
        this.select(event.coordinate!.x, event.coordinate!.y)
        break;
      case UserEventType.UNDO:
        this.undo();
        break;
      case UserEventType.END_GAME:
        this.endGame()
        break;
    }
  }
  private select(x: number, y: number) {
    this.game.pick(x, y)
  }
  private undo() {
    this.game.undo()
  }
  private endGame() {
    this.game.end()
  }
}
