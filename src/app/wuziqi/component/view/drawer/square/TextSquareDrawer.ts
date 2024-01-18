import { Player } from "../../../model/Player.js"
import { Square } from "../../../model/Square.js"
import { AppIcon } from "../../AppIcon.js"
import { WuziqiSquareDrawer } from "./WuziqiSquareDrawer.js"

export class WuziqiTextSquareDrawer implements WuziqiSquareDrawer {
    private playerToTextMap = new Map<boolean | null, string>()
    constructor() {
        this.playerToTextMap.set(true, AppIcon.BLACK),
        this.playerToTextMap.set(false, AppIcon.WHITE),

        this.playerToTextMap.set(null, " ")
    }
    noteSequence(modelSquare: Square, uiSquare: HTMLElement): void {
        uiSquare.classList.add("square--sequence")
    }
    draw(player: Player, uiSquare: HTMLElement): void {
        uiSquare.textContent = player ? this.playerToTextMap.get(player.id)! : ""
        uiSquare.className = "square"
        uiSquare.classList.add(`square--${!player ? 'empty' : player.id ? 'first' : 'second'}`)
        
    }
    
}