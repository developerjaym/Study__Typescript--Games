import { Piece } from "../../../model/Piece.js"
import { Square } from "../../../model/Square.js"
import { Icon } from "../../Icon.js"
import { SquareDrawer } from "./SquareDrawer.js"

export class TextSquareDrawer implements SquareDrawer {
    private pieceToTextMap = new Map<Piece | null, string>()
    constructor() {
        this.pieceToTextMap.set(Piece.ONE, Icon.ONE),
        this.pieceToTextMap.set(Piece.TWO, Icon.TWO),
        this.pieceToTextMap.set(Piece.THREE, Icon.THREE),
        this.pieceToTextMap.set(Piece.FOUR, Icon.FOUR),
        this.pieceToTextMap.set(Piece.FIVE, Icon.FIVE),
        this.pieceToTextMap.set(Piece.SIX, Icon.SIX),

        this.pieceToTextMap.set(null, " ")
    }
    noteLegalMove(modelSquare: Square, uiSquare: HTMLElement): void {
        uiSquare.classList.add("square--legal")
    }
    draw(modelSquare: Square, uiSquare: HTMLElement): void {
        uiSquare.textContent = this.pieceToTextMap.get(modelSquare.piece) || ""
        uiSquare.className = "square"
        uiSquare.classList.add(`square--${!modelSquare.player ? 'empty' : modelSquare.player.id ? 'first' : 'second'}`)
        
    }
    
}