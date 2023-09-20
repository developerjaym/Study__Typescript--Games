import { Observable } from "../../../observer/observer.js";
import { GameEvent } from "./GameEvent.js";

export abstract class AbstractGame extends Observable<GameEvent> {
  abstract start(): void;
  abstract move(x: number, y: number): void;
  abstract undo(): void;
  abstract end(): void;
}
