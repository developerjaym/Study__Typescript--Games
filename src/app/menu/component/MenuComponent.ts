import { Page } from "../../../library/observer/Page.js";
import { RouterEvent } from "../../../library/router/RouterEvent.js";
import { HTMLService } from "../../../library/service/HTMLService.js";
import injector from "../../injector/Injector.js";

interface MenuOption {
    name: string,
    description: string,
    route: string,
    image?: string
}

export class MenuComponent implements Page {
    private menuElement: HTMLElement;
    private gameRoutes: MenuOption[] = [
        {
            name: "GBP",
            description: "Place dice in sequences.",
            route: "#/gbp",
            image: "assets/gbp.png"
        },
        {
            name: "Jayrrows",
            description: "Strategically move your pieces to defeat the enemy king.",
            route: "#/jayrrows",
            image: "assets/jayrrows.png"
        },
        {
            name: "Slot Machine",
            description: "Pull a lever and lose money.",
            route: "#/slot",
            image: "assets/slot.png"
        },
        {
            name: "CrossIt",
            description: "Use the letters to make words.",
            route: "https://localstorage.tools/game/word/",
            image: "https://localstorage.tools/game/image/cross_it_screenshot.png"
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