import { Square } from "../../../model/Square.js";

export interface JayrrowsSquareDrawer {
    noteLegalMove(legalMove: Square, arg1: HTMLElement): void;
    draw(modelSquare: Square, uiSquare: HTMLElement): void;
}