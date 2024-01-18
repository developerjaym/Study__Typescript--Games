import { Board } from "../../component/model/Board.js";
import { Sequence } from "../../component/model/Sequence.js";
import { Square } from "../../component/model/Square.js";


export class WuziqiSequenceService {
  findSequences(board: Board): Sequence[] {
    let sequences: Sequence[] = [];
    const directions = [
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
    ];
    // for each occupied square
    //  check each direction
    //   if matching piece found
    //    add to sequence
    //     continue
    // filter out subsequences
    const squares = board.squares.flat();
    for (const square of squares) {
      for (const direction of directions) {
        const sequence: Sequence = { squares: [square] };
        this.continueSearchingThisDirection(sequence, direction, board);
        sequences.push(sequence);
      }
    }

    return sequences.filter((sequence) => sequence.squares.length >= 5);
  }
  private continueSearchingThisDirection(
    sequence: Sequence,
    direction: { x: number; y: number },
    board: Board
  ): void {
    const lastSquare = sequence.squares[sequence.squares.length - 1];
    const nextXToCheck = lastSquare.coordinate!.x + direction.x;
    const nextYToCheck = lastSquare.coordinate!.y + direction.y;
    const nextSquareToCheck = board.squares
      .flat()
      .find(
        (square: Square) =>
          square.coordinate?.x === nextXToCheck &&
          square.coordinate?.y === nextYToCheck
      );
      
    if (
      nextSquareToCheck &&
      nextSquareToCheck.player &&
      nextSquareToCheck.player.id === lastSquare.player?.id
    ) {
      sequence.squares.push(nextSquareToCheck);
      // then go to next square
      this.continueSearchingThisDirection(sequence, direction, board);
    } else {
      return;
    }
  }
}
