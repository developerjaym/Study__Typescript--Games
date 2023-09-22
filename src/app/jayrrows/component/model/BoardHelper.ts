import { Board } from "./Board.js";
import {
  Piece,
  getLegalMoves,
  determinePromotion as promotedPiece,
} from "./Piece.js";
import { Player } from "./Player.js";
import { Square } from "./Square.js";

export class BoardHelper {
  static createFreshSquares(
    width = 8,
    height = 8,
    players: Player[]
  ): Square[][] {
    const playerOne = players[0];
    const playerTwo = players[1];
    const emptyBoard = new Array(height)
      .fill(null)
      .map((filler, y) =>
        this.createRow(
          width,
          y,
          y < 2 ? playerOne : y >= height - 2 ? playerTwo : null
        )
      );
    return emptyBoard;
  }
  private static createRow(
    width: number,
    y: number,
    player: Player | null = null
  ): Square[] {
    return new Array(width)
      .fill(null)
      .map((filler, x) =>
        this.createSquare(x, y, player ? Piece.ALL : null, player)
      );
  }
  private static createSquare(
    x: number,
    y: number,
    piece: Piece | null = null,
    player: Player | null = null
  ): Square {
    return {
      player,
      piece,
      selected: false,
      coordinate: { x, y },
    };
  }
  static getSquare(board: Board, x: number, y: number): Square {
    return board.squares
      .flat()
      .find(
        (square) => square.coordinate.x === x && square.coordinate.y === y
      )!;
  }
  static selectedSquare(board: Board): Square | undefined {
    return board.squares.flat().find((square) => square.selected);
  }
  static isLegalSelection(
    board: Board,
    player: Player,
    square: Square
  ): boolean {
    const playerMatchesSquare = player === square.player;
    const squareIsntKing = square.piece !== Piece.KING;
    const squareCanMove = this.determineLegalMovesForSquare(board, player, square).length > 0;    
    return squareIsntKing && playerMatchesSquare && squareCanMove;
  }
  static isLegalMove(originSquare: Square, destinationSquare: Square): boolean {    
    const differentOwner = originSquare.player !== destinationSquare.player;
    const legalMoves = getLegalMoves(originSquare.piece);
    const xDiff = originSquare.coordinate.x - destinationSquare.coordinate.x;
    const yDiff = originSquare.coordinate.y - destinationSquare.coordinate.y;

    const goodCoordinate = legalMoves?.some(
      ({ x, y }) => xDiff === x && yDiff === y
    );
    return differentOwner && goodCoordinate;
  }
  static determinePromotion(
    piece: Piece,
    player: Player,
    board: Board,
    originSquare: Square,
    destinationSquare: Square
  ): Piece {
    if ([Piece.DIAGONAL, Piece.HORIZONTAL, Piece.VERTICAL].includes(piece)) {
      return piece;
    } else if (
      !board.squares
        .flat()
        .filter((square) => square.player === player)
        .some((square) => square.piece === Piece.KING)
    ) {
      // No king
      return Piece.KING;
    } else {
      return promotedPiece(
        originSquare.coordinate.x - destinationSquare.coordinate.x,
        originSquare.coordinate.y - destinationSquare.coordinate.y
      );
    }
  }
  static unselectAll(board: Board): void {
    board.squares.flat().forEach((square) => (square.selected = false));
  }
  static determineLegalSelections(board: Board, player: Player): Square[] {
    return board.squares
      .flat()
      .filter((square) => BoardHelper.isLegalSelection(board, player, square));
  }
  static determineLegalMoves(board: Board, player: Player): Square[] {
    const selectedSquare = BoardHelper.selectedSquare(board)!;    
    return this.determineLegalMovesForSquare(board, player, selectedSquare);
  }

  private static determineLegalMovesForSquare(
    board: Board,
    player: Player,
    selectedSquare: Square
  ): Square[] {
    return board.squares
      .flat()
      .filter((square) => BoardHelper.isLegalMove(selectedSquare, square));
  }
}
