import { Player } from "../../../model/Player.js";
import { Square } from "../../../model/Square.js";

export interface WuziqiSquareDrawer {
    noteSequence(modelSquare: Square, uiSquare: HTMLElement): void;
    draw(player: Player, uiSquare: HTMLElement): void;
}