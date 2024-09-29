import { FlipbookCoordinates } from "../model/FlipbookEvent.js";
import { FlipbookModel } from "../model/FlipbookModel.js";

export class FlipbookController {
    constructor(private model: FlipbookModel) {
        
    }
    onTick(): void {
        this.model.tick()
    }
    onShot(coordinates: FlipbookCoordinates) {
        this.model.shoot(coordinates)
    }
}