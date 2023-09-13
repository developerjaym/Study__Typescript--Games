import { GameEvent } from "../game/model/GameEvent.js";
import { Player } from "../game/model/Player.js";
import { AppTransition, CustomAnimation } from "../game/view/transition/Transition.js";
import injector from "./Injector.js";
import { RandomPieceService } from "./RandomPieceService.js";

export class RandomRollAnimationService {
    constructor(private randomPieceService: RandomPieceService = injector.getRandomPieceService(), private squareDrawer = injector.getSquareDrawer()) {

    }
    roll(event: GameEvent, dieElement: HTMLElement, dieContainer: HTMLElement): void {
        new CustomAnimation(1000, AppTransition.SLIDE_IN, [...this.createRolls(5, event.activePlayer, dieElement),
            () => this.squareDrawer.draw(event.displaySquare, dieElement)
          ], dieContainer).start() 
    }
    private createRolls(count: number, player: Player, dieElement: HTMLElement): Function[] {
        const rolls: Function[] = []
        for(let i = 0; i < count; i++) {
          rolls.push(() => this.squareDrawer.draw({
            player: player,
            piece: this.randomPieceService.getRandomPiece()
          }, dieElement))
        }
        return rolls;
      }
}