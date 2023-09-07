import { Square } from "../../../model/Square.js";

export interface SquareDrawer {
    noteLegalMove(legalMove: Square, arg1: HTMLElement): void;
    draw(modelSquare: Square, uiSquare: HTMLElement): void;
}