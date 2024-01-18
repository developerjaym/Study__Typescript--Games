import { Player } from "../../../model/Player.js"
import { Square } from "../../../model/Square.js"
import { WuziqiSquareDrawer } from "./WuziqiSquareDrawer.js"

export class WuziqiTextSquareDrawer implements WuziqiSquareDrawer {
    constructor() {
    }
    noteSequence(modelSquare: Square, uiSquare: HTMLElement): void {
        uiSquare.classList.add("square--sequence")
    }
    draw(player: Player, uiSquare: HTMLElement): void {
        uiSquare.className = "square"
        uiSquare.classList.add(`square--${!player ? 'empty' : player.id ? 'first' : 'second'}`)   
    }
    
}