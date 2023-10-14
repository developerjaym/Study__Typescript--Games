import injector from "../../../../injector/Injector.js";
import { WheelConfiguration } from "../../configuration/SlotConfiguration.js";
import { WheelFaceDrawer } from "./WheelFaceDrawer.js";

export class ImageOnlyWheelFaceDrawer implements WheelFaceDrawer {
    constructor(private htmlService = injector.getHtmlService()) {

    }
    draw(wheelFace: WheelConfiguration, containerElement: HTMLElement): void {
        const img = this.htmlService.create("img", ["face__image"])
        img.src = wheelFace.image
        img.alt = wheelFace.alt
        containerElement.replaceChildren(img)
    }
    
}