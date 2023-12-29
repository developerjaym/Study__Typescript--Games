import { HuntCoordinates } from "../model/HuntEvent.js";
import { HuntModel } from "../model/HuntModel.js";

export class HuntController {
    constructor(private model: HuntModel) {
        
    }
    onTick(): void {
        this.model.tick()
    }
    onShot(coordinates: HuntCoordinates) {
        console.log('controller.onShot', coordinates);
        this.model.shoot(coordinates)
    }
}