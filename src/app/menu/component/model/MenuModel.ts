import { Observable } from "../../../../library/observer/observer.js";
import { MenuFilterEvent, MenuFilterEventType } from "../controller/MenuFilterEvent.js";
import { MenuFilterSubmission } from "../controller/MenuFilterSubmission.js";
import { MenuFilterState } from "./MenuFilterState.js";
import { MenuOption } from "./MenuOption.js";
import { MenuTag } from "./MenuTag.js";

export class MenuModel extends Observable<MenuFilterEvent> {
    private menuFilterState: MenuFilterState = {
        BOARD_GAME: "on",
        GAMBLING: "on",
        MULTIPLAYER: "on",
        ONE_A_DAY: "on",
        ONE_PLAYER: "on",
        TRIVIA: "on",
        TWO_PLAYER: "on",
        WORD: "on",
    }
    private gameRoutes: MenuOption[] = [
        {
          name: "GBP",
          description: "Place dice in sequences.",
          route: "#/gbp",
          image: "assets/gbp.png",
          tags: [MenuTag.BOARD_GAME, MenuTag.TWO_PLAYER],
          visible: true,
        },
        {
          name: "Jayrrows",
          description: "Strategically move your pieces to defeat the enemy king.",
          route: "#/jayrrows",
          image: "assets/jayrrows.png",
          tags: [MenuTag.BOARD_GAME, MenuTag.TWO_PLAYER],
          visible: true,
        },
        {
          name: "Slot Machine",
          description: "Pull a lever and lose money.",
          route: "#/slot",
          image: "assets/slot.png",
          tags: [MenuTag.GAMBLING, MenuTag.ONE_PLAYER],
          visible: true,
        },
        {
          name: "Deal or No Deal",
          description: "Choose a case and then choose some more or accept cash.",
          route: "https://localstorage.tools/dond/",
          image: "https://localstorage.tools/game/image/dond_screenshot.png",
          tags: [MenuTag.ONE_PLAYER, MenuTag.GAMBLING],
          visible: true,
        },
        {
          name: "CrossIt",
          description: "Use the letters to make words.",
          route: "https://localstorage.tools/game/word/",
          image: "https://localstorage.tools/game/image/cross_it_screenshot.png",
          tags: [MenuTag.WORD, MenuTag.ONE_A_DAY, MenuTag.ONE_PLAYER],
          visible: true,
        },
        {
          name: "FindIt",
          description: "Use the letters to make a single word.",
          route: "https://localstorage.tools/game/word/dice/",
          image: "https://localstorage.tools/game/image/find_it_screenshot.png",
          tags: [MenuTag.WORD, MenuTag.ONE_A_DAY, MenuTag.ONE_PLAYER],
          visible: true,
        },
        {
          name: "EarnIt",
          description: "Strategically place letters to make words.",
          route: "https://localstorage.tools/game/word/beta/",
          image: "https://localstorage.tools/game/image/earn_it_screenshot.png",
          tags: [MenuTag.WORD, MenuTag.ONE_A_DAY, MenuTag.ONE_PLAYER],
          visible: true,
        },
        {
          name: "Chinglish",
          description:
            "Given an audio clip of a Chinese adaptation of an English name, guess the English name.",
          route: "https://localstorage.tools/game/chinglish/",
          image: "https://localstorage.tools/game/image/chinglish_screenshot.png",
          tags: [
            MenuTag.WORD,
            MenuTag.ONE_A_DAY,
            MenuTag.ONE_PLAYER,
            MenuTag.TWO_PLAYER,
            MenuTag.MULTI_PLAYER,
            MenuTag.TRIVIA,
          ],
          visible: true,
        },
        {
          name: "Giffish",
          description:
            "Given a series of gifs, guess the movie hinted at. For example, a gif of a candle + a gif of a toilet = John Wick.",
          route: "https://localstorage.tools/game/giffish/",
          image: "https://localstorage.tools/game/image/giffish_screenshot.png",
          tags: [
            MenuTag.WORD,
            MenuTag.ONE_A_DAY,
            MenuTag.ONE_PLAYER,
            MenuTag.TWO_PLAYER,
            MenuTag.MULTI_PLAYER,
            MenuTag.TRIVIA,
          ],
          visible: true,
        },
        {
          name: "Lost In Trivia",
          description: "Answer the questions to look smart.",
          route: "https://localstorage.tools/trivia/app/",
          image: "https://localstorage.tools/game/image/trivia_screenshot.png",
          tags: [
            MenuTag.ONE_PLAYER,
            MenuTag.TWO_PLAYER,
            MenuTag.MULTI_PLAYER,
            MenuTag.TRIVIA,
          ],
          visible: true,
        },
      ];
      constructor() {
        super();

      }
      start(): void {
        this.notifyAll({
            type: MenuFilterEventType.START,
            menuOptions: structuredClone(this.gameRoutes),
            menuFilterState: structuredClone(this.menuFilterState)
        })
      }
      changeFilters(menuFilterChange: MenuFilterSubmission): void {        
        this.menuFilterState = {...menuFilterChange};
        this.gameRoutes = this.adjustVisibility(this.menuFilterState, this.gameRoutes)
        this.notifyAll({
          type: MenuFilterEventType.FILTER,
          menuOptions: structuredClone(this.gameRoutes),
          menuFilterState: structuredClone(this.menuFilterState)
      })
      }
      private adjustVisibility(filterState: MenuFilterState, options: MenuOption[]): MenuOption[] {
        return options.map(option => ({...option, visible: this.shouldBeVisible(filterState, option)}))
      }
      private shouldBeVisible(filterState: MenuFilterState, option: MenuOption): boolean {
        // check each checkbox against tags        
        return option.tags.some(tag => this.tagMatches(filterState, tag)) 
      }
      private tagMatches(filterState: MenuFilterState, tag: MenuTag): boolean {
        return Object.entries(filterState).filter(([name, on]) => on === 'on').map(([name, on]) => name).some((name) => name === tag)
      }
}