import { FlipbookCoordinates } from "../model/FlipbookEvent.js";
import { FlipbookModel } from "../model/FlipbookModel.js";

export class FlipbookController {
    constructor(private model: FlipbookModel) {
        
    }
    addPage(): void {
        console.log("add page");
        // TODO add a page to the model
    }
}