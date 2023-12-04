import { Observable } from "../../../../library/observer/observer.js";
import { MenuFilterEvent, MenuFilterEventType } from "../controller/MenuFilterEvent.js";
import { MenuFilterSubmission } from "../controller/MenuFilterSubmission.js";
import { MenuFilterState } from "./MenuFilterState.js";
import { MenuOption } from "./MenuOption.js";
import { MenuTag } from "./MenuTag.js";

export class MenuModel extends Observable<MenuFilterEvent> {
    private menuFilterState: MenuFilterState = {
      BOARD_GAME: undefined,
      GAMBLING: undefined,
      MULTIPLAYER: undefined,
      ONE_A_DAY: undefined,
      ONE_PLAYER: undefined,
      TRIVIA: undefined,
      TWO_PLAYER: undefined,
      WORD: undefined
    }
    private gameRoutes: MenuOption[] = [
        {
          name: "GBP",
          description: "Place dice in sequences.",
          route: "#/gbp",
          image: "https://localstorage.tools/game/image/gbp_screenshot.webp",
          tags: [MenuTag.BOARD_GAME, MenuTag.TWO_PLAYER],
          visible: true,
        },
        {
          name: "Jayrrows",
          description: "Strategically move your pieces to defeat the enemy king.",
          route: "#/jayrrows",
          image: "https://localstorage.tools/game/image/jayrrows_screenshot.webp",
          tags: [MenuTag.BOARD_GAME, MenuTag.TWO_PLAYER],
          visible: true,
        },
        {
          name: "Slot Machine",
          description: "Pull a lever and lose money.",
          route: "#/slot",
          image: "https://localstorage.tools/game/image/slot_screenshot.webp",
          tags: [MenuTag.GAMBLING, MenuTag.ONE_PLAYER],
          visible: true,
        },
        {
          name: "Deal or No Deal",
          description: "Choose a case and then choose some more or accept cash.",
          route: "https://localstorage.tools/dond/",
          image: "https://localstorage.tools/game/image/dond_screenshot.webp",
          tags: [MenuTag.ONE_PLAYER, MenuTag.GAMBLING],
          visible: true,
        },
        {
          name: "CrossIt",
          description: "Use the letters to make words.",
          route: "https://localstorage.tools/game/word/",
          image: "https://localstorage.tools/game/image/cross_it_screenshot.webp",
          tags: [MenuTag.WORD, MenuTag.ONE_A_DAY, MenuTag.ONE_PLAYER],
          visible: true,
        },
        {
          name: "FindIt",
          description: "Use the letters to make a single word.",
          route: "https://localstorage.tools/game/word/dice/",
          image: "https://localstorage.tools/game/image/find_it_screenshot.webp",
          tags: [MenuTag.WORD, MenuTag.ONE_A_DAY, MenuTag.ONE_PLAYER],
          visible: true,
        },
        {
          name: "EarnIt",
          description: "Strategically place letters to make words.",
          route: "https://localstorage.tools/game/word/beta/",
          image: "https://localstorage.tools/game/image/earn_it_screenshot.webp",
          tags: [MenuTag.WORD, MenuTag.ONE_A_DAY, MenuTag.ONE_PLAYER],
          visible: true,
        },
        {
          name: "Chinglish",
          description:
            "Given an audio clip of a Chinese adaptation of an English name, guess the English name.",
          route: "https://localstorage.tools/game/chinglish/",
          image: "https://localstorage.tools/game/image/chinglish_screenshot.webp",
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
            "Given a series of gifs, guess the movie hinted at. For example, a gif of a toilet + a gif of a candle = John Wick.",
          route: "https://localstorage.tools/game/giffish/",
          image: "https://localstorage.tools/game/image/giffish_screenshot.webp",
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
          image: "https://localstorage.tools/game/image/trivia_screenshot.webp",
          tags: [
            MenuTag.ONE_PLAYER,
            MenuTag.TWO_PLAYER,
            MenuTag.MULTI_PLAYER,
            MenuTag.TRIVIA,
          ],
          visible: true,
        },
        {
          name: "Unnamed Game",
          description: "Hunt animals, probably.",
          route: "#/hunt",
          image: "https://localstorage.tools/game/image/trivia_screenshot.webp",
          tags: [
            MenuTag.ONE_PLAYER
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
        if(Object.values(filterState).every(filter => !Boolean(filter))) {
          return options.map(option => ({...option, visible: true}))
        }
        return options.map(option => ({...option, visible: this.shouldBeVisible(filterState, option)}))
      }
      private shouldBeVisible(filterState: MenuFilterState, option: MenuOption): boolean {
        // every checked filter matches some tag on the MenuOption      
        return Object.entries(filterState).filter(([name, on]) => on === 'on').map(([name, on]) => name).every((name) => option.tags.some(tag => tag === name));
      }
}