import { SystemIcon } from "../../../../library/SystemIcon.js";
import { Viewable } from "../../../../library/observer/Viewable.js";
import { CustomAnimation } from "../../../../library/transition/Transition.js";
import injector from "../../../injector/Injector.js";
import { SlotController } from "../controller/SlotController.js";
import { SlotEvent, SlotEventType } from "../event/SlotEvent.js";
import { WheelUI } from "./wheel/WheelUI.js";

export class SlotView implements Viewable<SlotEvent> {
  private element: HTMLElement;
  private wheels: WheelUI[] = [];
  constructor(
    private controller: SlotController,
    private htmlService = injector.getHtmlService(),
    private routerService = injector.getRouterService()
  ) {
    this.wheels = [
      new WheelUI(0, () => {}),
      new WheelUI(1, () => {}),
      new WheelUI(2, (event: SlotEvent) => {
        // only the last wheel's stopping should trigger the re-enabling
        this.onSpinAnimationOver(event);
      }),
    ];
    this.element = this.createElement();
  }
  get component(): HTMLElement {
    return this.element;
  }
  onChange(event: SlotEvent): void {
    // enable or disable buttons
    this.element
      .querySelectorAll("button")
      .forEach(
        (button) =>
          (button.disabled =
            event.type === SlotEventType.SPIN_OVER ||
            (button.classList.contains("lever") && event.currentBet === 0))
      );
    if (event.type === SlotEventType.SPIN_OVER) {
      console.log(
        "Right answers",
        event.wheels.map((wheel) => wheel.faces[wheel.position].icon)
      );

      this.wheels.forEach((wheel) => wheel.onChange(event));
    } else {
      this.updateBets(event);
    }
  }
  private createElement(): HTMLElement {
    const lever = this.htmlService.create("button", ["lever"], "lever", "PULL");

    const machine = this.htmlService.create("div", ["machine"], "machine");

    const currentBetDisplay = this.createNumberDisplay('BET', '$0', "currentBet")


    const betAction = (amount: number) => () =>
      this.controller.onChangeBet(amount);
    const betMoreButton = this.htmlService.create(
      "button",
      ["button", "button--icon", "machine__button"],
      "betMoreButton",
      "INCREASE BET"
    );
    betMoreButton.addEventListener("click", betAction(1));
    const betLessButton = this.htmlService.create(
      "button",
      ["button", "button--icon", "machine__button"],
      "betLessButton",
      "DECREASE BET"
    );
    betLessButton.addEventListener("click", betAction(-1));

    const onLeverEvent = () => {
      if (lever.disabled) {
        return;
      }
      lever.disabled = true;
      betMoreButton.disabled = true;
      betLessButton.disabled = true;
      new CustomAnimation(
        3000,
        "pull",
        [() => this.controller.onPull()],
        lever
      ).start();
    };

    lever.addEventListener("click", onLeverEvent);
    lever.addEventListener("drag", onLeverEvent);
    lever.addEventListener("touchstart", onLeverEvent, { passive: true });

    this.wheels.forEach((wheel) => machine.append(wheel.component));
    machine.append(betLessButton, currentBetDisplay, betMoreButton, lever);

    const currentCashDisplay = this.createNumberDisplay('BALANCE', '$100', "currentBalance")

    const casino = this.htmlService.create("main", ["casino"], "casino1");

    const header = this.htmlService.create(
      "header",
      ["header"],
      "casinoHeader"
    );
    const title = this.htmlService.create(
      "h1",
      ["header__title"],
      crypto.randomUUID(),
      "CASINO"
    );
    const homeButton = this.htmlService.create(
      "button",
      ["button", "button--icon", "button--home"],
      crypto.randomUUID(),
      SystemIcon.HOME
    );
    homeButton.addEventListener("click", () =>
      this.routerService.routeTo("menu")
    );

    header.append(title, homeButton);

    casino.append(header, currentCashDisplay, machine);

    const resultDisplay = this.htmlService.create(
      "div",
      ["casino__result"],
      "currentSlotResult",
      "Results..."
    );
    casino.append(resultDisplay);

    return casino;
  }
  private onSpinAnimationOver(event: SlotEvent): void {
    this.element
      .querySelectorAll("button")
      .forEach((button) => (button.disabled = false));
    this.element.querySelector("#currentSlotResult")!.textContent =
      event.results[event.results.length - 1]?.message || "Nothing yet";
    this.updateBets(event);
  }
  private updateBets(event: SlotEvent): void {
    this.element.querySelector(
      "#currentBet"
    )!.textContent = `$${event.currentBet}`; // TODO format currency
    this.element.querySelector(
      "#currentBalance"
    )!.textContent = `$${event.balance}`; // TODO format currency
  }

  private createNumberDisplay(label: string, text: string = '', id: string = crypto.randomUUID()): HTMLElement {
    const currentBetDisplay = this.htmlService.create(
        "div",
        ["number-display"],
        
      );
  
      const betDisplayLabel = this.htmlService.create(
        "label",
        ["number-display__label"],
        crypto.randomUUID(),
        label
      );
      const betDisplayText = this.htmlService.create(
        "span",
        ["number-display__text"],
        id,
        text
      );
      currentBetDisplay.append(betDisplayLabel, betDisplayText)
      return currentBetDisplay
  }
}
