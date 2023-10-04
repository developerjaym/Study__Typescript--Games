import { SystemIcon } from "../../../../library/SystemIcon.js";
import { Viewable } from "../../../../library/observer/Viewable.js";
import { ToastMood } from "../../../../library/service/toast/ToastService.js";
import injector from "../../../injector/Injector.js";
import { ReceiptWinningsDrawer } from "../../service/drawer/ReceiptWinningsDrawer.js";
import { WinningsDrawer } from "../../service/drawer/WinningsDrawer.js";
import { SoundEffect } from "../../sound/SoundEffect.js";
import { SlotController } from "../controller/SlotController.js";
import { SlotEvent, SlotEventType } from "../event/SlotEvent.js";
import { LeverUI } from "./lever/LeverUI.js";
import { WheelUI } from "./wheel/WheelUI.js";

export class SlotView implements Viewable<SlotEvent> {
  private element: HTMLElement;
  private wheels: WheelUI[] = [];
  private lever: LeverUI;

  constructor(
    private controller: SlotController,
    private htmlService = injector.getHtmlService(),
    private routerService = injector.getRouterService(),
    private toastService = injector.getToastService(),
    private winningsDrawer: WinningsDrawer = new ReceiptWinningsDrawer(),
    private soundEffectService = injector.getSoundEffectService()
  ) {
    this.wheels = [
      new WheelUI(0, () => {}),
      new WheelUI(1, () => {}),
      new WheelUI(2, (event: SlotEvent) => {
        // only the last wheel's stopping should trigger the re-enabling
        this.onSpinAnimationOver(event);
      }),
    ];
    this.lever = new LeverUI(this.controller, (slotEvent: SlotEvent) =>
      this.onLeverPullAnimationOver(slotEvent)
    );
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
    switch(event.type) {
        case SlotEventType.BET_MADE:
            this.soundEffectService.get(SoundEffect.COIN).play();
        case SlotEventType.START:
            this.updateBets(event)
            break;
        case SlotEventType.SPIN_OVER:
            this.lever.onChange(event);
            break;
    }
  }
  private createElement(): HTMLElement {
    const machine = this.htmlService.create("div", ["machine"], "machine");

    const currentBetDisplay = this.createNumberDisplay(
      "BET",
      "$0",
      "currentBet"
    );

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

    this.wheels.forEach((wheel) => machine.append(wheel.component));

    const resultDisplay = this.winningsDrawer.component;
    machine.append(
      betLessButton,
      currentBetDisplay,
      betMoreButton,
      resultDisplay,
      this.lever.component
    );

    const currentCashDisplay = this.createNumberDisplay(
      "BALANCE",
      "$100",
      "currentBalance"
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

    return casino;
  }
  private onLeverPullAnimationOver(event: SlotEvent): void {
    this.wheels.forEach((wheel) => wheel.onChange(event));
  }
  private onSpinAnimationOver(event: SlotEvent): void {
    this.element
      .querySelectorAll("button")
      .forEach((button) => (button.disabled = false));
    this.winningsDrawer.append(event.results[event.results.length - 1]);
    this.updateBets(event);
    const winnings = event.results[event.results.length - 1].winnings;
    if(winnings > 0) {
        this.soundEffectService.get(SoundEffect.WIN).play()
    }
    this.toastService.showToast(
      `+$${winnings}`,
      winnings > 0 ? ToastMood.HAPPY : ToastMood.SAD
    );
  }
  private updateBets(event: SlotEvent): void {
    this.element.querySelector(
      "#currentBet"
    )!.textContent = `$${event.currentBet}`; // TODO format currency
    this.element.querySelector(
      "#currentBalance"
    )!.textContent = `$${event.balance}`; // TODO format currency
  }

  private createNumberDisplay(
    label: string,
    text: string = "",
    id: string = crypto.randomUUID()
  ): HTMLElement {
    const currentBetDisplay = this.htmlService.create("div", [
      "number-display",
    ]);

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
    currentBetDisplay.append(betDisplayLabel, betDisplayText);
    return currentBetDisplay;
  }
}
