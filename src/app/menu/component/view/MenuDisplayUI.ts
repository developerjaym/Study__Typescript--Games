import { Viewable } from "../../../../library/observer/Viewable.js";
import injector from "../../../injector/Injector.js";
import { MenuFilterEvent } from "../controller/MenuFilterEvent.js";

export class MenuDisplayUI implements Viewable<MenuFilterEvent> {
  private element: HTMLElement;
  constructor(private htmlService = injector.getHtmlService()) {
    this.element = this.htmlService.create("div", ["main-menu__options"]);
  }
  get component(): HTMLElement {
    return this.element;
  }
  onChange(event: MenuFilterEvent): void {
    const newMenuOptions = []
    for (const gameRoute of event.menuOptions.filter(
      (option) => option.visible
    )) {
      const option = this.htmlService.create("a", ["card", "card--link"]);
      option.href = `${gameRoute.route}`;

      const image = this.htmlService.create("img", ["card__image"]);
      if (gameRoute.image) {
        image.src = gameRoute.image;
        image.alt = `screenshot of ${gameRoute.name}`;
      }
      option.append(image);

      const title = this.htmlService.create("h2", ["card__title"]);
      title.textContent = gameRoute.name;
      option.append(title);

      const description = this.htmlService.create("p", ["card__body"]);
      description.textContent = gameRoute.description;
      option.append(description);
      newMenuOptions.push(option)

    }
    this.element.replaceChildren(...newMenuOptions);
}
}
