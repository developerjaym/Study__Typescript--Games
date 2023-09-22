import { HTMLService } from "../../../../library/service/HTMLService.js";
import injector from "../../../injector/Injector.js";
import { GameEvent } from "../model/GameEvent.js";
import { Viewable } from "../../../../library/observer/Viewable.js";

export class PlayerDataDisplay implements Viewable<GameEvent> {
  container: HTMLElement;
  scoreDisplay: HTMLElement;
  constructor(
    private playerId: boolean,
    private htmlService: HTMLService = injector.getHtmlService()
  ) {
    this.container = this.htmlService.create("section", [
      "player-data-display",
      `player-data-display--${this.playerId ? 'first' : 'second'}`
    ]);
    this.scoreDisplay = this.htmlService.create(
      "p",
      ["score"]
    );
    this.container.appendChild(this.scoreDisplay);
  }
  get component(): HTMLElement {
    return this.container;
  }
  onChange(event: GameEvent): void {
    const player = event.players.find(p => p.id === this.playerId)!
    this.scoreDisplay.textContent = `${player.highScore + player.lowScore} = ${player.highScore} + ${player.lowScore}`
  }
}
