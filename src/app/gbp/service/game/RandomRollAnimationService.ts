import {
  AppTransition,
  CustomAnimation,
} from "../../../../library/transition/Transition.js";
import { Runnable } from "../../../../library/utility/Functions.js";
import { GameEvent } from "../../component/model/GameEvent.js";
import { Player } from "../../component/model/Player.js";
import injector from "../../../injector/Injector.js";
import { RandomPieceService } from "./RandomPieceService.js";
import { GBPSoundEffect } from "../../component/view/sound/GBPSoundEffect.js";

export class RandomRollAnimationService {
  constructor(
    private randomPieceService: RandomPieceService = injector.getRandomPieceService(),
    private squareDrawer = injector.getGBPSquareDrawer(),
    private soundEffectService = injector.getSoundEffectService()
  ) {}
  roll(
    event: GameEvent,
    dieElement: HTMLElement,
    dieContainer: HTMLElement
  ): void {
    this.soundEffectService.get(GBPSoundEffect.DICE).play();
    new CustomAnimation(
      1000,
      AppTransition.SLIDE_IN,
      [
        ...this.createRolls(5, event.activePlayer, dieElement),
        () => this.squareDrawer.draw(event.displaySquare, dieElement),
      ],
      dieContainer
    ).start();
  }
  private createRolls(
    count: number,
    player: Player,
    dieElement: HTMLElement
  ): Runnable[] {
    const rolls: Runnable[] = [];
    for (let i = 0; i < count; i++) {
      rolls.push(() =>
        this.squareDrawer.draw(
          {
            player: player,
            piece: this.randomPieceService.getRandomPiece(),
          },
          dieElement
        )
      );
    }
    return rolls;
  }
}
