import { Square } from "../../../model/Square.js";

export interface SquareDrawer {
    noteSequence(modelSquare: Square, uiSquare: HTMLElement): void;
    draw(modelSquare: Square, uiSquare: HTMLElement): void;
}