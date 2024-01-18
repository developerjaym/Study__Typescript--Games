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
      case GameEventType.END:
        const deducedState: GameState = structuredClone({
          over: event.over,
          players: event.players,
          board: event.board,
          activePlayer: event.activePlayer,
          sequences: event.sequences
        });
        this.snapshots.push(deducedState);
        break;
    }
  }
  
}