import { AbstractSnapshotter } from "../../../observer/AbstractSnapshotter.js";
import { GameEvent, GameEventType } from "./GameEvent.js";
import { GameState } from "./GameState.js";

export class Snapshotter extends AbstractSnapshotter<GameState> {
  onChange(event: GameEvent): void {
    switch (event.type) {
      case GameEventType.START:
        this.snapshots = [];
      case GameEventType.UNDO:
      case GameEventType.MOVE:
        const deducedState: GameState = structuredClone({
          players: event.players,
          board: event.board,
          activePlayer: event.activePlayer,
          displaySquare: event.displaySquare,
          sequences: event.sequences
        });
        this.snapshots.push(deducedState);
        break;
      case GameEventType.END:
        this.snapshots = [];
        break;
    }
  }
  
}