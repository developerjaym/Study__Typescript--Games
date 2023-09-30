import { SystemIcon } from "../../../../library/SystemIcon.js";
import { Viewable } from "../../../../library/observer/Viewable.js";
import { AppTransition, CustomAnimation } from "../../../../library/transition/Transition.js";
import injector from "../../../injector/Injector.js";
import { SlotController } from "../controller/SlotController.js";
import { SlotEvent, SlotEventType, SlotFaceType } from "../event/SlotEvent.js";
import { WheelUI } from "./wheel/WheelUI.js";

export class SlotView implements Viewable<SlotEvent> {
  private element: HTMLElement;
  private wheels: WheelUI[] = []
  constructor(
    private controller: SlotController,
    private htmlService = injector.getHtmlService(),
    private routerService = injector.getRouterService()
  ) {
      this.wheels = [new WheelUI(0), new WheelUI(1), new WheelUI(2)]
    this.element = this.createElement();
  }
  get component(): HTMLElement {
    return this.element;
  }
  onChange(event: SlotEvent): void {
    this.element.querySelector(
      "#currentBet"
    )!.textContent = `$${event.currentBet}`; // TODO format currency
    this.element.querySelector(
      "#currentBalance"
    )!.textContent = `$${event.balance}`; // TODO format currency
    this.wheels.forEach(wheel => wheel.onChange(event))
    // TODO when the animation is in progress, don't let the user change their bet
    // TODO when the animation is over, display the new bet and balance amounts
  }
  private createElement(): HTMLElement {
    const lever = this.htmlService.create("button", ["lever"], "lever", "PULL");
    lever.addEventListener("click", () => {
        
        new CustomAnimation(3000, 'pull', [() => this.controller.onPull()], lever).start()
    });

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

    const currentBetArea = this.htmlService.create("div", [], "currentBetArea");
    currentBetArea.append(currentBetDisplay, betMoreButton, betLessButton);

    this.wheels.forEach(wheel => machine.append(wheel.component))
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

    casino.append(header, machine, currentCashDisplay);

    return casino;
  }
}
