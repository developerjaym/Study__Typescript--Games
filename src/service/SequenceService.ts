import { Board } from "../game/model/Board.js";
import { Piece } from "../game/model/Piece.js";
import { Player } from "../game/model/Player.js";
import { Sequence } from "../game/model/Sequence.js";

export class SequenceService {
  updatePlayersScoresFromSequences(sequences: Sequence[], players: Player[]): void {
    // score each sequence
    // find highest and lowest scoring sequence for each player
    // update players lowScore and highScore
    const scoreMap = new Map<boolean, Map<Sequence, number>>()
    for(const player of players) {
        scoreMap.set(player.id, new Map<Sequence, number>())
    }
    for(const sequence of sequences) {
        const score:number = this.scoreSequence(sequence)
        const player: Player = sequence.squares[0].player!;
        scoreMap.get(player.id)?.set(sequence, score)
    }
    for(const player of players) {
        const sequenceScoreMap = scoreMap.get(player.id)
        // if just one sequence, it becomes highScore
        const sequenceCount = Array.from(sequenceScoreMap?.entries() || []).length
        if(sequenceCount === 0) {
            player.highScore = 0
            player.lowScore = 0
        }
        else if(sequenceCount === 1) {
            player.highScore = Array.from(sequenceScoreMap!.values())[0]
            player.lowScore = 0
        }
        else {
            const sequenceValues = Array.from(sequenceScoreMap!.values())
            player.highScore = Math.max(...sequenceValues)
            player.lowScore = Math.min(...sequenceValues)
        }
    }
  }
  private scoreSequence(sequence: Sequence): number {
    if(sequence.squares.find(square => square.piece === Piece.ONE)) {
        return 1;
    }
    return sequence.squares.reduce((pre, cur) => (cur.piece || 0) + pre, 0)
  }
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

    sequences = sequences.filter((sequence) => sequence.squares.length >= 5);
    return this.uniqueSequences(sequences);
  }
  private uniqueSequences(sequences: Sequence[]) {
    let uniqueSequences: Sequence[] = [...sequences];
    for (const sequence of sequences) {
      for (const otherSequence of sequences) {
        if (sequence === otherSequence) {
          continue;
        }
        // if two squares match between these two sequences, remove the shorter one
        if (this.isSubsequence(sequence, otherSequence)) {
          const shorterSequence =
            sequence.squares.length <= otherSequence.squares.length
              ? sequence
              : otherSequence;
          uniqueSequences = uniqueSequences.filter(
            (seq) => seq !== shorterSequence
          );
        }
      }
    }
    return uniqueSequences;
  }
  private isSubsequence(sequenceA: Sequence, sequenceB: Sequence): boolean {
    let matchingSquareCount = 0;
    for (const squareA of sequenceA.squares) {
      for (const squareB of sequenceB.squares) {
        if (squareA === squareB) {
          matchingSquareCount++;
          if (matchingSquareCount == 2) {
            return true;
          }
        }
      }
    }
    return false;
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
        (square) =>
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
