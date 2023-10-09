import { Page } from "../../../library/observer/Page.js";
import { RouterEvent } from "../../../library/router/RouterEvent.js";
import { HTMLService } from "../../../library/service/HTMLService.js";
import injector from "../../injector/Injector.js";

enum MenuTag {
    BOARD_GAME = "Board", ONE_A_DAY = "One-A-Day", TWO_PLAYER = "Two Player", ONE_PLAYER = "One Player", WORD = "Word", GAMBLING = "Gambling", TRIVIA = "Trivia", MULTI_PLAYER = "Multiplayer"
}

interface MenuOption {
    name: string,
    description: string,
    route: string,
    image?: string,
    tags: MenuTag[],
    visible: boolean
}

export class MenuComponent implements Page {
    private menuElement: HTMLElement;
    private gameRoutes: MenuOption[] = [
        {
            name: "GBP",
            description: "Place dice in sequences.",
            route: "#/gbp",
            image: "assets/gbp.png",
            tags: [MenuTag.BOARD_GAME, MenuTag.TWO_PLAYER],
            visible: true
        },
        {
            name: "Jayrrows",
            description: "Strategically move your pieces to defeat the enemy king.",
            route: "#/jayrrows",
            image: "assets/jayrrows.png",
            tags: [MenuTag.BOARD_GAME, MenuTag.TWO_PLAYER],
            visible: true
        },
        {
            name: "Slot Machine",
            description: "Pull a lever and lose money.",
            route: "#/slot",
            image: "assets/slot.png",
            tags: [MenuTag.GAMBLING, MenuTag.ONE_PLAYER],
            visible: true
        },
        {
            name: "Deal or No Deal",
            description: "Choose a case and then choose some more or accept cash.",
            route: "https://localstorage.tools/dond/",
            image: "https://localstorage.tools/dond/favicon.ico",
            tags: [MenuTag.ONE_PLAYER, MenuTag.GAMBLING],
            visible: true
        },
        {
            name: "CrossIt",
            description: "Use the letters to make words.",
            route: "https://localstorage.tools/game/word/",
            image: "https://localstorage.tools/game/image/cross_it_screenshot.png",
            tags: [MenuTag.WORD, MenuTag.ONE_A_DAY, MenuTag.ONE_PLAYER],
            visible: true
        },
        {
            name: "FindIt",
            description: "Use the letters to make a single word.",
            route: "https://localstorage.tools/game/word/dice/",
            image: "https://localstorage.tools/game/image/find_it_screenshot.png",
            tags: [MenuTag.WORD, MenuTag.ONE_A_DAY, MenuTag.ONE_PLAYER],
            visible: true
        },
        {
            name: "EarnIt",
            description: "Strategically place letters to make words.",
            route: "https://localstorage.tools/game/word/beta/",
            image: "https://localstorage.tools/game/image/earn_it_screenshot.png",
            tags: [MenuTag.WORD, MenuTag.ONE_A_DAY, MenuTag.ONE_PLAYER],
            visible: true
        },
        {
            name: "Chinglish",
            description: "Given an audio clip of a Chinese adaptation of an English name, guess the English name.",
            route: "https://localstorage.tools/game/chinglish/",
            image: "https://localstorage.tools/game/image/chinglish_screenshot.png",
            tags: [MenuTag.WORD, MenuTag.ONE_A_DAY, MenuTag.ONE_PLAYER, MenuTag.TWO_PLAYER, MenuTag.MULTI_PLAYER, MenuTag.TRIVIA],
            visible: true
        },
        {
            name: "Lost In Trivia",
            description: "Answer the questions to look smart.",
            route: "https://localstorage.tools/trivia/app/",
            image: "https://localstorage.tools/game/image/trivia_screenshot.png",
            tags: [MenuTag.ONE_PLAYER, MenuTag.TWO_PLAYER, MenuTag.MULTI_PLAYER, MenuTag.TRIVIA],
            visible: true
        },
        
    ]
    constructor(private htmlService: HTMLService = injector.getHtmlService()) {
        this.menuElement = this.htmlService.create("main", ["main-menu"], "mainMenu");
        const menuHeader = this.htmlService.create("header", ["main-menu__header"]);
        menuHeader.append(this.htmlService.create("h1", ["main-menu__title"], "mainMenuHeaderTitle", "Games"))
        this.menuElement.append(menuHeader)
        for(const gameRoute of this.gameRoutes) {
            const option = this.htmlService.create("a", ["card", "card--link"])
            option.href = `${gameRoute.route}`

            const image = this.htmlService.create("img", ["card__image"]);
            if(gameRoute.image) {
                image.src = gameRoute.image
                image.alt = `screenshot of ${gameRoute.name}`
            }
            option.append(image)

            const title = this.htmlService.create("h2", ["card__title"])
            title.textContent = gameRoute.name
            option.append(title)

            const description = this.htmlService.create("p", ["card__body"])
            description.textContent = gameRoute.description
            option.append(description)

            this.menuElement.appendChild(option)
        }
        
    }
    get stylesheet(): string[] {
        return ["menu.css"];
    }
    get component(): HTMLElement {
       return this.menuElement;
    }
    onChange(event: RouterEvent): void {
       
    }
    
}