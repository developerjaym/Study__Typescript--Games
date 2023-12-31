import { Board } from "./Board.js";
import { Piece } from "./Piece.js";
import { Player } from "./Player.js";
import { Square } from "./Square.js";

export class BoardHelper {
  static createFreshSquares(width = 12, height = 12): Square[][] {
    const emptyBoard = new Array(height)
      .fill(null)
      .map((filler, y) => this.createRow(width, y));
    return emptyBoard;
  }
  private static createRow(width: number, y: number): Square[] {
    return new Array(width)
      .fill(null)
      .map((filler, x) => this.createSquare(x, y, null, null));
  }
  static createSquare(
    x: number,
    y: number,
    piece: Piece | null = null,
    player: Player | null = null
  ): Square {
    return {
      player,
      piece,
      coordinate: { x, y },
    };
  }
  static getSquare(board: Board, x: number, y: number): Square {
    return board.squares
      .flat()
      .find(
        (square) => square.coordinate?.x === x && square.coordinate?.y === y
      )!;
  }
  static isBoardFull(board: Board): boolean {
    return board.squares.flat().every(square => Boolean(square.piece))
  }
  static isLegalSelection(square: Square): boolean {
    return !Boolean(square.player);
  }
  static determineLegalMoves(board: Board): Square[] {
    return board.squares.flat().filter((square) => !Boolean(square.player));
  }
  
}
