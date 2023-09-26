import { AppEnvironment } from "../../../environment/AppEnvironment.js";
import injector from "../../../injector/Injector.js";
import { AbstractGame } from "./AbstractGame.js";
import { BoardHelper } from "./BoardHelper.js";
import { GameEventType } from "./GameEvent.js";
import { GameState } from "./GameState.js";
import { Snapshotter } from "./GameStateSnapshotter.js";
import { Piece } from "./Piece.js";
import { PlayerHelper } from "./Player.js";
import { Square } from "./Square.js";

export class Game extends AbstractGame {
  private state: GameState;
  private snapshotter: Snapshotter;
  constructor(
    existingState: GameState | null = null,
    private env: AppEnvironment = injector.getEnvironment()
  ) {
    super();
    this.state = existingState || this.getFreshState();
    this.snapshotter = new Snapshotter();
    this.subscribe(this.snapshotter);
  }
  start() {
    this.notifyAll(
      structuredClone({
        type: GameEventType.START,
        message: "Game Started!",
        legalMoves: BoardHelper.determineLegalSelections(
          this.state.board,
          this.state.activePlayer
        ),
        ...this.state,
      })
    );
  }
  pick(x: number, y: number): void {
    const previouslySelectedSquare = BoardHelper.selectedSquare(
      this.state.board
    );
    const thisSquare = BoardHelper.getSquare(this.state.board, x, y);
    console.log('legal', previouslySelectedSquare && BoardHelper.isLegalMove(previouslySelectedSquare, thisSquare));
    
    if (
      previouslySelectedSquare &&
      !BoardHelper.isLegalMove(previouslySelectedSquare, thisSquare)
    ) {
      // Player is likely trying to change their selection
      this.unselect();
    } else if (previouslySelectedSquare) {
      this.move(previouslySelectedSquare, thisSquare);
    } else {
      this.select(thisSquare);
    }
  }
  undo() {
    if (this.snapshotter.hasPreviousStates()) {
      this.state = this.snapshotter.pop();
      this.notifyAll(
        structuredClone({
          type: GameEventType.UNDO,
          message: "Undone!",
          legalMoves: BoardHelper.determineLegalSelections(
            this.state.board,
            this.state.activePlayer
          ),
          ...this.state,
        })
      );
    } else {
      this.end();
    }
  }
  end() {
    this.state = this.getFreshState();
    this.start();
  }
  private move(originSquare: Square, destinationSquare: Square) {
      const movingPiece = originSquare.piece!;
      const destinationPiece = destinationSquare.piece;
      const newPiece = BoardHelper.determinePromotion(
        movingPiece,
        this.state.activePlayer,
        this.state.board,
        originSquare,
        destinationSquare
      );
      destinationSquare.piece = newPiece;
      destinationSquare.player = this.state.activePlayer;
      originSquare.piece = null;
      originSquare.player = null;
      BoardHelper.unselectAll(this.state.board);
      if (destinationPiece === Piece.KING) {
        this.state.activePlayer.victor = true;
        this.notifyAll(
          structuredClone({
            type: GameEventType.END,
            message: `GAME OVER!\n\n${this.state.activePlayer.name} has won!`,
            legalMoves: [],
            ...this.state,
          })
        );
      } else {
        this.changeTurns();
        this.notifyAll(
          structuredClone({
            type: GameEventType.MOVE,
            message: "Next Player!",
            legalMoves: BoardHelper.determineLegalSelections(
              this.state.board,
              this.state.activePlayer
            ),
            ...this.state,
          })
        );
      }
  }
  private select(square: Square) {
    BoardHelper.unselectAll(this.state.board);
    if (
      BoardHelper.isLegalSelection(
        this.state.board,
        this.state.activePlayer,
        square
      )
    ) {
      square.selected = BoardHelper.isLegalSelection(
        this.state.board,
        this.state.activePlayer,
        square
      );

      this.notifyAll(
        structuredClone({
          type: GameEventType.SELECT,
          message: `OK`,
          legalMoves: BoardHelper.determineLegalMoves(
            this.state.board,
            this.state.activePlayer
          ),
          ...this.state,
        })
      );
    } else {
      this.unselect();
    }
  }
  private changeTurns() {
    this.state.activePlayer = this.state.players.find(
      (player) => player.id !== this.state.activePlayer.id
    )!;
  }
  private getFreshState(): GameState {
    const players = PlayerHelper.createPlayers();
    const state = {
      board: {
        squares: BoardHelper.createFreshSquares(
          this.env.jayrrows_width,
          this.env.jayrrows_height,
          players
        ),
      },
      players,
      activePlayer: players[0],
    };
    return state;
  }

  private unselect() {
    BoardHelper.unselectAll(this.state.board);
    this.notifyAll(
      structuredClone({
        type: GameEventType.UNSELECT,
        message: "OK",
        legalMoves: BoardHelper.determineLegalSelections(
          this.state.board,
          this.state.activePlayer
        ),
        ...this.state,
      })
    );
  }
}
