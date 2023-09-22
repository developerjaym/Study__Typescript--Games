import { Board } from "./Board.js";
import { Player } from "./Player.js";

export interface GameState {
    board: Board;
    players: Player[];
    activePlayer: Player;
  }