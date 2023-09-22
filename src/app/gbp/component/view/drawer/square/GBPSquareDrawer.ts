import { Square } from "../../../model/Square.js";

export interface GBPSquareDrawer {
    noteSequence(modelSquare: Square, uiSquare: HTMLElement): void;
    draw(modelSquare: Square, uiSquare: HTMLElement): void;
}