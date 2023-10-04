import { Viewable } from "../../../../../library/observer/Viewable.js";
import { CustomAnimation } from "../../../../../library/transition/Transition.js";
import { Consumer } from "../../../../../library/utility/Functions.js";
import injector from "../../../../injector/Injector.js";
import { SoundEffect } from "../../../sound/SoundEffect.js";
import { SlotController } from "../../controller/SlotController.js";
import { SlotEvent, SlotEventType } from "../../event/SlotEvent.js";

export class LeverUI implements Viewable<SlotEvent>{
    private lever: HTMLButtonElement;
    constructor(private controller: SlotController, private onPullAnimationOver: Consumer<SlotEvent>, private htmlService = injector.getHtmlService(), private soundEffectService = injector.getSoundEffectService()) {
        this.lever = this.htmlService.create("button", ["lever"], "lever", "PULL");
        this.lever.addEventListener("click", () => this.onPull())
        this.lever.addEventListener("touchstart", () => this.onPull(), {passive: true})
        this.lever.addEventListener("drag", () => this.onPull())
    }
    get component(): HTMLElement {
        return this.lever;
    }
    onChange(event: SlotEvent): void {
      if(event.type === SlotEventType.SPIN_OVER) {
        const leverSound = this.soundEffectService.get(SoundEffect.LEVER);
        leverSound.loop = true;
        leverSound.play()
        new CustomAnimation(
            3000,
            "pull",
            [
              () => {
                
                leverSound.pause();
                this.lever.disabled = false
                this.onPullAnimationOver(event)
              },
            ],
            this.lever
          ).start();
      }
    }
    private onPull(): void {
        
        this.lever.disabled = true;
        this.controller.onPull();
        // betMoreButton.disabled = true;
        // betLessButton.disabled = true;
        
    }

}