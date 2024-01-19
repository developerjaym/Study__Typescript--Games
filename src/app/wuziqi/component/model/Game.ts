import injector from "../../../injector/Injector.js";
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
    private env = injector.getEnvironment(),
    private sequenceService = injector.getWuziqiSequenceService()
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
        legalMoves: BoardHelper.determineLegalMoves(this.state.board),
        ...this.state,
      })
    );
  }
  move(x: number, y: number): void {
    if(this.state.over) {
      return;
    }
    const thisSquare = BoardHelper.getSquare(this.state.board, x, y);
    if (BoardHelper.isLegalSelection(thisSquare)) {
      thisSquare.player = this.state.activePlayer;
      this.state.sequences = this.sequenceService.findSequences(this.state.board);
      if(this.state.sequences.length) {
        this.state.over = true
        this.state.activePlayer.victor = true;
        this.notifyAll({
          type: GameEventType.END,
          message: `${
            thisSquare.player.name
          } wins!`,
          legalMoves: [],
          ...this.state,
        });
      }
      else {
        this.changeTurns();
        this.notifyAll({
          type: GameEventType.MOVE,
          message: "Moved!",
          legalMoves: BoardHelper.determineLegalMoves(this.state.board),
          ...this.state,
        });
      }
      
    }
  }
  undo() {
    if (this.snapshotter.hasPreviousStates()) {
      this.state = this.snapshotter.pop();
      this.notifyAll(
        structuredClone({
          type: GameEventType.UNDO,
          message: "Undone!",
          legalMoves: BoardHelper.determineLegalMoves(this.state.board),
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
  }
  private getFreshState(): GameState {
    const players = PlayerHelper.createPlayers();
    const state: GameState = {
      over: false,
      board: {
        squares: BoardHelper.createFreshSquares(
          this.env.wuziqi_width,
          this.env.wuziqi_height
        ),
      },
      players,
      activePlayer: players[0],
      sequences: [],
    };
    return state;
  }
}
