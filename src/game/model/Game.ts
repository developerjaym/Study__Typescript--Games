import injector from "../../service/Injector.js";
import { Environment } from "../../service/environment/Environment.js";
import { AbstractGame } from "./AbstractGame.js";
import { BoardHelper } from "./BoardHelper.js";
import { GameEventType } from "./GameEvent.js";
import { GameState } from "./GameState.js";
import { Snapshotter } from "./GameStateSnapshotter.js";
import { PlayerHelper } from "./Player.js";

export class Game extends AbstractGame {
  private state: GameState;
  private snapshotter: Snapshotter;
  constructor(
    existingState: GameState | null = null,
    private env: Environment = injector.getEnvironment(),
    private randomPieceService = injector.getRandomPieceService()
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
        legalMoves: BoardHelper.determineLegalMoves(
          this.state.board
        ),
        ...this.state,
      })
    );
  }
  move(x: number, y: number): void {
    const thisSquare = BoardHelper.getSquare(this.state.board, x, y);
    if (
      BoardHelper.isLegalSelection(
        thisSquare
      )
    ) {
      thisSquare.piece = this.state.displaySquare.piece;
      thisSquare.player = this.state.activePlayer;
      this.state.displaySquare.piece = null;
      this.changeTurns();
      this.state.displaySquare.player = this.state.activePlayer;
      this.notifyAll({
        type: GameEventType.MOVE,
        message: "Moved!",
        legalMoves: BoardHelper.determineLegalMoves(
          this.state.board
        ),
        ...this.state,
      })
    }
  }
  undo() {    
    if (this.snapshotter.hasPreviousStates()) {
      this.state = this.snapshotter.pop();
      this.notifyAll(
        structuredClone({
          type: GameEventType.UNDO,
          message: "Undone!",
          legalMoves: BoardHelper.determineLegalMoves(
            this.state.board
          ),
          ...this.state,
        })
      );
    } 
  }
  end() {
    this.state = this.getFreshState();
    this.start();
  }
  private changeTurns() {
    this.state.activePlayer = this.state.players.find(
      (player) => player.id !== this.state.activePlayer.id
    )!;
    this.state.displaySquare.piece = this.randomPieceService.getRandomPiece()
  }
  private getFreshState(): GameState {
    const players = PlayerHelper.createPlayers();
    const state = {
      board: {
        squares: BoardHelper.createFreshSquares(
          this.env.width,
          this.env.height
        ),
      },
      displaySquare: BoardHelper.createSquare(-1, -1, this.randomPieceService.getRandomPiece(), players[0]),
      players,
      activePlayer: players[0],
    };
    return state;
  }
}
