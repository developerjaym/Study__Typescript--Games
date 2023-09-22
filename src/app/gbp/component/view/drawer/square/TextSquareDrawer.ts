import { Piece } from "../../../model/Piece.js"
import { Square } from "../../../model/Square.js"
import { AppIcon } from "../../AppIcon.js"
import { GBPSquareDrawer } from "./GBPSquareDrawer.js"

export class GBPTextSquareDrawer implements GBPSquareDrawer {
    private pieceToTextMap = new Map<Piece | null, string>()
    constructor() {
        this.pieceToTextMap.set(Piece.ONE, AppIcon.ONE),
        this.pieceToTextMap.set(Piece.TWO, AppIcon.TWO),
        this.pieceToTextMap.set(Piece.THREE, AppIcon.THREE),
        this.pieceToTextMap.set(Piece.FOUR, AppIcon.FOUR),
        this.pieceToTextMap.set(Piece.FIVE, AppIcon.FIVE),
        this.pieceToTextMap.set(Piece.SIX, AppIcon.SIX),

        this.pieceToTextMap.set(null, " ")
    }
    noteSequence(modelSquare: Square, uiSquare: HTMLElement): void {
        uiSquare.classList.add("square--sequence")
    }
    draw(modelSquare: Square, uiSquare: HTMLElement): void {
        uiSquare.textContent = this.pieceToTextMap.get(modelSquare.piece) || ""
        uiSquare.className = "square"
        uiSquare.classList.add(`square--${!modelSquare.player ? 'empty' : modelSquare.player.id ? 'first' : 'second'}`)
        
    }
    
}