import { WheelConfiguration } from "../../configuration/SlotConfiguration";
import { WheelFaceDrawer } from "./WheelFaceDrawer";

export class IconOnlyWheelFaceDrawer implements WheelFaceDrawer {
    draw(wheelFace: WheelConfiguration, containerElement: HTMLElement): void {
        containerElement.textContent = wheelFace.image
    }
    
}