import { Viewable } from "../../../../library/observer/Viewable.js";
import { HTMLService } from "../../../../library/service/HTMLService.js";
import { AppEnvironment } from "../../../environment/AppEnvironment.js";
import injector from "../../../injector/Injector.js";
import { IController } from "../controller/IController.js";
import { UserEventType } from "../controller/UserEvent.js";
import { GameEvent, GameEventType } from "../model/GameEvent.js";
import { Square } from "../model/Square.js";
import { JayrrowsSquareDrawer } from "./drawer/square/JayrrowsSquareDrawer.js";

export class BoardUI implements Viewable<GameEvent> {
  board: HTMLElement;
  squares: Map<string, HTMLElement>;
  constructor(
    private controller: IController,
    private htmlService: HTMLService = injector.getHtmlService(),
    private env: AppEnvironment = injector.getEnvironment(),
    private squareDrawer: JayrrowsSquareDrawer = injector.getJayrrowsSquareDrawer()
  ) {
    this.squares = new Map<string, HTMLElement>();
    this.board = this.htmlService.create("section", ["board"]);
    const squareWidth = `calc(100% / (${this.env.jayrrows_width} + 1))`;
    this.board.style.gridTemplateColumns = `repeat(${this.env.jayrrows_width}, ${squareWidth})`;
    this.board.style.gridTemplateRows = `repeat(${this.env.jayrrows_width}, ${squareWidth})`;
    for (let y = 0; y < this.env.jayrrows_height; y++) {
      for (let x = 0; x < this.env.jayrrows_width; x++) {
        const id = this.xyToID(x, y);
        const square = this.htmlService.create("button", ["square"], id);
        const handleMove = () =>
          this.controller.onEvent({
            type: UserEventType.SELECT,
            coordinate: { x, y },
          });
        square.addEventListener("drop", handleMove);
        square.addEventListener("dragstart", handleMove);
        square.addEventListener("dragover", (e) => {
          e.preventDefault();
        });
        square.addEventListener("click", handleMove);

        this.board.appendChild(square);
        this.squares.set(id, square);
      }
    }
  }
  get component(): HTMLElement {
    return this.board;
  }
  onChange(event: GameEvent): void {    
    const isLegalMove = (square: Square, legalMoves: Square[]) => {
      return legalMoves.some(legalMove => legalMove.coordinate.x === square.coordinate.x && legalMove.coordinate.y === square.coordinate.y)
    }
    event.board.squares
      .flat()
      .forEach((modelSquare) => this.updateSquare(modelSquare, event.type, isLegalMove(modelSquare, event.legalMoves)));

    event.legalMoves.forEach((legalMove) =>
      this.squareDrawer.noteLegalMove(
        legalMove,
        this.squares.get(
          this.xyToID(legalMove.coordinate.x, legalMove.coordinate.y)
        )!
      )
    );
  }
  private xyToID(x: number, y: number): string {
    return `square__${x}-${y}`;
  }
  private updateSquare(modelSquare: Square, eventType: GameEventType, isLegalMove: boolean): void {
    const uiSquare = this.squares.get(
      this.xyToID(modelSquare.coordinate.x, modelSquare.coordinate.y)
    )!;
    this.squareDrawer.draw(modelSquare, uiSquare);
    uiSquare.draggable = modelSquare.selected || (isLegalMove && [GameEventType.START, GameEventType.UNDO, GameEventType.UNSELECT, GameEventType.MOVE].includes(eventType))
    if(isLegalMove) {
      this.squareDrawer.noteLegalMove(modelSquare, uiSquare)
    }
  }
}
