import { GameController } from "./GameController.js";
import { IController } from "./IController.js";
import { UserEvent } from "./UserEvent.js";
import { RemoteSender } from "./remote/RemoteSender.js";

export class RemoteController implements IController {
    constructor(private gameController: GameController, private remoteSender: RemoteSender) {
    }
    onEvent(event: UserEvent): void {
        this.gameController.onEvent(event)
        this.remoteSender.post(event)
    }
    
}