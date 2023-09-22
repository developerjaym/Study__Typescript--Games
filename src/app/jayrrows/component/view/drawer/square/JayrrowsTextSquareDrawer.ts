import { AppIcon } from "../../../../../gbp/component/view/AppIcon.js"
import { Piece } from "../../../model/Piece.js"
import { Square } from "../../../model/Square.js"
import { JayrrowsSquareDrawer } from "./JayrrowsSquareDrawer.js"

export class JayrrowsTextSquareDrawer implements JayrrowsSquareDrawer {
    private pieceToTextMap = new Map<Piece | null, string>()
    constructor() {
        this.pieceToTextMap.set(Piece.ALL, AppIcon.ALL_PIECE)
        this.pieceToTextMap.set(Piece.KING, AppIcon.KING_PIECE)
        this.pieceToTextMap.set(Piece.VERTICAL, AppIcon.VERTICAL_PIECE)
        this.pieceToTextMap.set(Piece.HORIZONTAL, AppIcon.HORIZONTAL_PIECE)
        this.pieceToTextMap.set(Piece.DIAGONAL, AppIcon.DIAGONAL_PIECE)
        this.pieceToTextMap.set(null, " ")
    }
    noteLegalMove(modelSquare: Square, uiSquare: HTMLElement): void {
        uiSquare.classList.add("square--legal")
    }
    draw(modelSquare: Square, uiSquare: HTMLElement): void {
        uiSquare.textContent = this.pieceToTextMap.get(modelSquare.piece) || ""
        uiSquare.className = "square"
        uiSquare.classList.add(`square--${!modelSquare.player ? 'empty' : modelSquare.player.id ? 'first' : 'second'}`)
        if(modelSquare.selected) {            
            uiSquare.classList.add("square--selected")
        }
    }
    
}