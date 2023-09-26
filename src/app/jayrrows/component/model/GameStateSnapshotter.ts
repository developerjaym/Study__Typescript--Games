import { AbstractSnapshotter } from "../../../../library/observer/AbstractSnapshotter.js";
import { GameEvent, GameEventType } from "./GameEvent.js";
import { GameState } from "./GameState.js";

export class Snapshotter extends AbstractSnapshotter<GameState> {
  onChange(event: GameEvent): void {
    switch (event.type) {
      case GameEventType.START:
        this.snapshots = [];
      case GameEventType.UNDO:
      case GameEventType.MOVE:
        // this.popCounter = 2;
        const deducedState: GameState = {
          players: event.players,
          board: event.board,
          activePlayer: event.activePlayer,
        };
        this.snapshots.push(deducedState);
        break;
      case GameEventType.END:
        this.snapshots = [];
        break;
    }
  }
}
