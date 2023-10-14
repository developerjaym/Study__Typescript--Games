import { WheelConfiguration } from "../../configuration/SlotConfiguration";

export interface WheelFaceDrawer {
    draw(wheelFace: WheelConfiguration, containerElement: HTMLElement): void;
}