import { Board } from "./Board.js";
import { Player } from "./Player.js";
import { Square } from "./Square.js";


export enum GameEventType {
  START,
  SELECT,
  MOVE,
  ERROR,
  END,
  UNSELECT,
  UNDO
}

export interface GameEvent {
    type: GameEventType,
    activePlayer: Player,
    board: Board,
    message: string,
    legalMoves: Square[],
    players: Player[]
}