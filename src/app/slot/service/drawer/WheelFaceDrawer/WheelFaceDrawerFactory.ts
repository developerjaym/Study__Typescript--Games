import { IconOnlyWheelFaceDrawer } from "./IconOnlyWheelFaceDrawer";
import { ImageOnlyWheelFaceDrawer } from "./ImageOnlyWheelFaceDrawer";
import { WheelFaceDrawer } from "./WheelFaceDrawer";

export class WheelFaceDrawerFactory {
    constructor(private iconWheelFaceDrawer: IconOnlyWheelFaceDrawer, private imageWheelFaceDrawer: ImageOnlyWheelFaceDrawer) {

    }
    get(type: "IMAGE" | "ICON"): WheelFaceDrawer {
        switch(type) {
            case "IMAGE":
                return this.imageWheelFaceDrawer
            default:
                return this.iconWheelFaceDrawer
        }
    }
}