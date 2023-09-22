import { Observer } from "../../../../library/observer/observer.js";
import { GameEvent, GameEventType } from "./GameEvent.js";
import { GameState } from "./GameState.js";

export class Snapshotter implements Observer<GameEvent> {
  private snapshots: GameState[] = [];
  // After a move, a state gets pushed
  // If I undo, I don't want that state that just got pushed, I want the state before that
  // That means going back 2 states
  // BUT if I just undid (and just went back 2 states), then the next time I undo, I just want to go back one state
  private popCounter = 2;
  onChange(event: GameEvent): void {
    switch (event.type) {
      case GameEventType.UNDO:
        this.popCounter = 1;
        break;
      case GameEventType.START:
        this.snapshots = [];
        break;
      case GameEventType.MOVE:
        this.popCounter = 2;
        const deducedState: GameState = {
          players: event.players,
          board: event.board,
          activePlayer: event.activePlayer,
        };
        this.snapshots.push(deducedState);
        break;
      case GameEventType.END:
        this.popCounter = 2;
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
