import { Observer } from "../../observer/observer.js";
import { GameEvent, GameEventType } from "./GameEvent.js";
import { GameState } from "./GameState.js";

export class Snapshotter implements Observer<GameEvent> {
  private snapshots: GameState[] = [];
  private popCounter = 2;
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
          displaySquare: event.displaySquare
        });
        this.snapshots.push(deducedState);
        break;
      case GameEventType.END:
        this.snapshots = [];
        break;
    }
  }
  hasPreviousStates(): boolean {
    return this.snapshots.length >= this.popCounter;
  }
  pop(): GameState {
    let popped = null;
    for (let i = 0; i < this.popCounter; i++) {
      popped = this.snapshots.pop();
    }
    
    return popped!;
  }
}