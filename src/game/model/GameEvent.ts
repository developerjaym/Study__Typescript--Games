import { Board } from "./Board.js";
import { GameState } from "./GameState.js";
import { Player } from "./Player.js";
import { Square } from "./Square.js";


export enum GameEventType {
  START,
  MOVE,
  ERROR,
  END,
  UNDO
}

export interface GameEvent extends GameState {
    type: GameEventType,
    message: string,
    legalMoves: Square[],
}