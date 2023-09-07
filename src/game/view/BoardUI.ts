import { HTMLService } from "../../service/HTMLService.js";
import injector from "../../service/Injector.js";
import { Environment } from "../../service/environment/Environment.js";
import { IController } from "../controller/IController.js";
import { UserEventType } from "../controller/UserEvent.js";
import { GameEvent } from "../model/GameEvent.js";
import { Square } from "../model/Square.js";
import { Viewable } from "./Viewable.js";
import { SquareDrawer } from "./drawer/square/SquareDrawer.js";
import { isRemoteTurnNext } from "./remoteUtilities.js";

export class BoardUI implements Viewable {
  board: HTMLElement;
  squares: Map<string, HTMLElement>;
  constructor(
    private controller: IController,
    private htmlService: HTMLService = injector.getHtmlService(),
    private env: Environment = injector.getEnvironment(),
    private squareDrawer: SquareDrawer = injector.getSquareDrawer()
  ) {
    this.squares = new Map<string, HTMLElement>();
    this.board = this.htmlService.create("section", ["board"]);
    const squareWidth = `calc(100% / (${this.env.width} + 0.25))`;
    const boardWidth = `calc(100vmin - (100vmin / ${this.env.width - 4}))`;
    this.board.style.gridTemplateColumns = `repeat(${this.env.width}, ${squareWidth})`;
    this.board.style.gridTemplateRows = `repeat(${this.env.width}, ${squareWidth})`;
    this.board.style.width = boardWidth;
    this.board.style.height = boardWidth;
    for (let y = 0; y < this.env.height; y++) {
      for (let x = 0; x < this.env.width; x++) {
        const id = this.xyToID(x, y);
        const square = this.htmlService.create("button", ["square"], id);
        square.addEventListener("click", () =>
          this.controller.onEvent({
            type: UserEventType.SELECT,
            coordinate: { x, y },
          })
        );
        this.board.appendChild(square);
        this.squares.set(id, square);
      }
    }
  }
  get component(): HTMLElement {
    return this.board;
  }
  onChange(event: GameEvent): void {
    event.board.squares
      .flat()
      .forEach((modelSquare) => this.updateSquare(modelSquare));
    event.legalMoves.forEach((legalMove) =>
      this.squareDrawer.noteLegalMove(
        legalMove,
        this.squares.get(
          this.xyToID(legalMove.coordinate!.x, legalMove.coordinate!.y)
        )!
      )
    );
    isRemoteTurnNext(event).then((yes) => {
      Array.from(this.squares.values()).forEach((button) => {
        if (yes) {
          button.setAttribute("disabled", `true`);
        } else {
          button.removeAttribute("disabled")
        }
      });
    });
  }
  private xyToID(x: number, y: number): string {
    return `square__${x}-${y}`;
  }
  private updateSquare(modelSquare: Square): void {
    const uiSquare = this.squares.get(
      this.xyToID(modelSquare.coordinate!.x, modelSquare.coordinate!.y)
    )!;
    this.squareDrawer.draw(modelSquare, uiSquare);
  }
}
