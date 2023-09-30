import { SlotGame } from "../model/SlotGame.js";

export class SlotController {
    constructor(private slotGame: SlotGame) {

    }
    onPull(): void {
        this.slotGame.onPull()
    }
    onChangeBet(byThisAmount: number): void {
        this.slotGame.onChangeBet(byThisAmount)
    }
}