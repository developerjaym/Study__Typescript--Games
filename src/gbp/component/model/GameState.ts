import { Board } from "./Board.js";
import { Player } from "./Player.js";
import { Sequence } from "./Sequence.js";
import { Square } from "./Square.js";

export interface GameState {
    board: Board;
    players: Player[];
    activePlayer: Player;
    displaySquare: Square;
    sequences: Sequence[];
  }