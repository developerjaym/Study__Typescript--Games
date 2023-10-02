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
    const reenable = (event: SlotEvent) => {
      this.onSpinAnimationOver(event);
    };
    this.wheels = [
      new WheelUI(0, reenable),
      new WheelUI(1, reenable),
      new WheelUI(2, reenable),
    ];
    this.element = this.createElement();
  }
  get component(): HTMLElement {
    return this.element;
  }
  onChange(event: SlotEvent): void {
    if (event.type === SlotEventType.SPIN_OVER) {
        console.log("Right answers", event.wheels.map(wheel => wheel.faces[wheel.position].icon))
      this.element
        .querySelectorAll("button")
        .forEach((button) => (button.disabled = true));
        this.wheels.forEach((wheel) => wheel.onChange(event));
    } else {
      this.updateBets(event);
    }

    
  }
  private createElement(): HTMLElement {
    const lever = this.htmlService.create("button", ["lever"], "lever", "PULL");

    const machine = this.htmlService.create("div", ["machine"], "machine");

    const currentBetDisplay = this.htmlService.create(
      "div",
      ["number-display", "number-display--current-bet"],
      "currentBet",
      "0"
    );

    const betAction = (amount: number) => () =>
      this.controller.onChangeBet(amount);
    const betMoreButton = this.htmlService.create(
      "button",
      ["button", "button--icon"],
      "betMoreButton",
      "INCREASE BET"
    );
    betMoreButton.addEventListener("click", betAction(1));
    const betLessButton = this.htmlService.create(
      "button",
      ["button", "button--icon"],
      "betLessButton",
      "DECREASE BET"
    );
    betLessButton.addEventListener("click", betAction(-1));

    lever.addEventListener("click", () => {
      lever.disabled = true;
      betMoreButton.disabled = true;
      betLessButton.disabled = true;
      new CustomAnimation(
        3000,
        "pull",
        [() => this.controller.onPull()],
        lever
      ).start();
    });

    const currentBetArea = this.htmlService.create("div", [], "currentBetArea");
    currentBetArea.append(currentBetDisplay, betMoreButton, betLessButton);

    this.wheels.forEach((wheel) => machine.append(wheel.component));
    machine.append(lever, currentBetArea);

    const currentCashDisplay = this.htmlService.create(
      "div",
      ["number-display", "number-display--current-balance"],
      "currentBalance",
      "100"
    );
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
}
