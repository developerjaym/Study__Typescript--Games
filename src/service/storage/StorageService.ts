import { GameEvent } from "../../game/model/GameEvent.js";
import { GameState } from "../../game/model/GameState.js";
import { Observer } from "../../observer/observer.js";

export interface StorageService extends Observer<GameEvent>{
  getClientId(): Promise<string>;
  setClientId(id: string): void;
  getGameState(): GameState | null;
}
