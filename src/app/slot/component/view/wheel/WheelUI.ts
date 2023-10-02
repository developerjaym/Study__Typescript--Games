import { Viewable } from "../../../../../library/observer/Viewable.js";
import { Consumer, Runnable } from "../../../../../library/utility/Functions.js";
import injector from "../../../../injector/Injector.js";
import { SlotEvent, SlotEventType, SlotFace } from "../../event/SlotEvent.js";

export class WheelUI implements Viewable<SlotEvent> {
  private top: HTMLElement;
  private topContents: HTMLElement;
  private middle: HTMLElement;
  private middleContents: HTMLElement;
  private bottom: HTMLElement;
  private bottomContents: HTMLElement;
  private element: HTMLElement;
  private static randomNumberOfSpins = Math.ceil(Math.random() * 2) + 2
  constructor(
    private index: number,
    private onSpinOver: Consumer<SlotEvent>,
    private htmlService = injector.getHtmlService()
  ) {
    this.top = this.htmlService.create("div", [
      "wheel__face",
      "wheel__face--top",
    ]);
    this.middle = this.htmlService.create("div", [
      "wheel__face",
      "wheel__face--selected",
    ]);
    this.bottom = this.htmlService.create("div", [
      "wheel__face",
      "wheel__face--bottom",
    ]);

    this.topContents = this.htmlService.create(
      "label",
      ["face__contents"],
      crypto.randomUUID(),
      "0"
    );
    this.middleContents = this.htmlService.create(
      "label",
      ["face__contents"],
      crypto.randomUUID(),
      "1"
    );
    this.bottomContents = this.htmlService.create(
      "label",
      ["face__contents"],
      crypto.randomUUID(),
      "2"
    );

    this.top.appendChild(this.topContents);
    this.middle.appendChild(this.middleContents);
    this.bottom.appendChild(this.bottomContents);

    this.element = this.htmlService.create("section", ["wheel"]);

    this.element.append(this.top, this.middle, this.bottom);
  }
  get component(): HTMLElement {
    return this.element;
  }
  onChange(event: SlotEvent): void {
    const wheel = event.wheels[this.index];
    this.element.classList.remove('flash')
    if (event.type === SlotEventType.SPIN_OVER) {
      let numberOfTicks =
        WheelUI.randomNumberOfSpins * wheel.faces.length +
        wheel.position +
        wheel.faces.length * this.index;
      const circularList = new WheelList<SlotFace>(wheel.faces);

      const [topIcon, middleIcon, bottomIcon] = circularList
        .range(1, 1)
        .map((face) => face.icon);
      this.topContents.textContent = topIcon;
      this.middleContents.textContent = middleIcon;
      this.bottomContents.textContent = bottomIcon;

      const intervalId = setInterval(() => {
        if (numberOfTicks < 1) {
          clearInterval(intervalId);
          this.element.classList.add('flash')
          circularList.setIndex(wheel.position);
          const [topIcon, middleIcon, bottomIcon] = circularList
            .range(1, 1)
            .map((face) => face.icon);
          this.topContents.textContent = topIcon;
          this.middleContents.textContent = middleIcon;
          this.bottomContents.textContent = bottomIcon;
          this.onSpinOver(event)
          return;
        }
        numberOfTicks--;
        circularList.tick();
        const [topIcon, middleIcon, bottomIcon] = circularList
          .range(1, 1)
          .map((face) => face.icon);
        this.topContents.textContent = topIcon;
        this.middleContents.textContent = middleIcon;
        this.bottomContents.textContent = bottomIcon;
      }, 100);
    }
  }
}

export class WheelList<T> {
  constructor(private list: T[] = [], private index = 0) {}
  setIndex(newIndex: number): void {
    this.index = newIndex;
  }
  current(): T {
    return this.list[this.index];
  }
  tick(by: number = 1): void {
    this.incrementIndex(by);
  }
  range(behind: number, ahead: number): T[] {
    const arr: T[] = [];
    const end = this.index + ahead;
    const start = this.index - behind;
    for (let i = start; i <= end; i++) {
      const cut =
        i % this.list.length < 0
          ? this.list.length + (i % this.list.length)
          : i % this.list.length;
      arr.push(this.list[cut]);
    }

    return arr;
  }
  private incrementIndex(by: number = 1): number {
    if (this.index >= this.list.length - 1) {
      this.index = 0;
    } else {
      this.index += by;
    }
    return this.index;
  }
}
