import { Viewable } from "../../../../../library/observer/Viewable.js";
import { Consumer } from "../../../../../library/utility/Functions.js";
import injector from "../../../../injector/Injector.js";
import {
  SlotConfiguration,
  WheelConfiguration,
} from "../../../service/configuration/SlotConfiguration.js";
import slotConfiguration from "../../../service/configuration/SlotConfigurationLoader.js";
import { SoundEffect } from "../../../sound/SoundEffect.js";
import { SlotEvent, SlotEventType } from "../../event/SlotEvent.js";

export class WheelUI implements Viewable<SlotEvent> {
  private top: HTMLElement;
  private topContents: HTMLElement;
  private middle: HTMLElement;
  private middleContents: HTMLElement;
  private bottom: HTMLElement;
  private bottomContents: HTMLElement;
  private element: HTMLElement;
  private static randomNumberOfSpins = Math.ceil(Math.random() * 2) + 2;
  constructor(
    private index: number,
    private onSpinOver: Consumer<SlotEvent>,
    private htmlService = injector.getHtmlService(),
    private soundEffectService = injector.getSoundEffectService(),
    private configuration: SlotConfiguration = slotConfiguration,
    private wheelFaceDrawerFactory = injector.getWheelFaceDrawerFactory()
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
      "div",
      ["face__contents"],
      crypto.randomUUID()
    );
    this.wheelFaceDrawerFactory.get(this.configuration.wheels[this.index][0].type).draw(
      this.configuration.wheels[this.index][0],
      this.topContents
    );
    this.middleContents = this.htmlService.create(
      "div",
      ["face__contents"],
      crypto.randomUUID()
    );
    this.wheelFaceDrawerFactory.get(this.configuration.wheels[this.index][1].type).draw(
      this.configuration.wheels[this.index][1],
      this.middleContents
    );
    this.bottomContents = this.htmlService.create(
      "div",
      ["face__contents"],
      crypto.randomUUID()
    );
    this.wheelFaceDrawerFactory.get(this.configuration.wheels[this.index][2].type).draw(
      this.configuration.wheels[this.index][2],
      this.bottomContents
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
    const selectedFace = event.wheels[this.index];
    const wheelSize = this.configuration.wheels[this.index].length;
    this.element.classList.remove("flash");
    if (event.type === SlotEventType.SPIN_OVER) {
      const soundEffect = this.soundEffectService.get(SoundEffect.SPIN);
      soundEffect.play();
      let numberOfTicks =
        WheelUI.randomNumberOfSpins * wheelSize +
        selectedFace +
        wheelSize * this.index;
      const circularList = new WheelList<WheelConfiguration>(
        this.configuration.wheels[this.index]
      );

      this.draw(circularList)

      this.onTick(
        numberOfTicks,
        circularList,
        selectedFace,
        event,
        soundEffect
      );
    }
  }
  private onTick(
    numberOfTicks: number,
    circularList: WheelList<WheelConfiguration>,
    selectedFace: number,
    event: SlotEvent,
    soundEffect: HTMLAudioElement
  ): void {
    setTimeout(() => {
      if (numberOfTicks < 1) {
        this.element.classList.add("flash");
        circularList.setIndex(selectedFace);
        this.draw(circularList)

        this.onSpinOver(event);
        soundEffect.pause();
        return;
      }
      numberOfTicks--;
      circularList.tick();
      this.draw(circularList)
      this.onTick(
        numberOfTicks,
        circularList,
        selectedFace,
        event,
        soundEffect
      );
    }, 450 / Math.sqrt(numberOfTicks));
  }
  private draw(circularList: WheelList<WheelConfiguration>): void {
    const [topFace, middleFace, bottomFace] = circularList
      .range(1, 1)
      .map((face) => face);
      this.wheelFaceDrawerFactory.get(topFace.type).draw(topFace, this.topContents);
      this.wheelFaceDrawerFactory.get(middleFace.type).draw(middleFace, this.middleContents);
      this.wheelFaceDrawerFactory.get(bottomFace.type).draw(bottomFace, this.bottomContents);
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
