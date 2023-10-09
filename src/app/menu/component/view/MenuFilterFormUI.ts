import { Viewable } from "../../../../library/observer/Viewable.js";
import injector from "../../../injector/Injector.js";
import { MenuController } from "../controller/MenuController.js";
import {
  MenuFilterEvent,
  MenuFilterEventType,
} from "../controller/MenuFilterEvent.js";
import { MenuFilterSubmission } from "../controller/MenuFilterSubmission.js";
import { MenuTag } from "../model/MenuTag.js";

export class MenuFilterFormUI implements Viewable<MenuFilterEvent> {
  private element: HTMLFormElement;
  private menuTagText = {
    [MenuTag.BOARD_GAME]: "Board",
    [MenuTag.GAMBLING]: "Gambling",
    [MenuTag.MULTI_PLAYER]: "Multiplayer",
    [MenuTag.ONE_A_DAY]: "One-A-Day",
    [MenuTag.ONE_PLAYER]: "One Player",
    [MenuTag.TRIVIA]: "Trivia",
    [MenuTag.TWO_PLAYER]: "Two Player",
    [MenuTag.WORD]: "Word",
  };
  constructor(
    private controller: MenuController,
    private htmlService = injector.getHtmlService()
  ) {
    this.element = this.htmlService.create("form", [
      "form",
      "main-menu__filters",
    ]);
    const makeInput = (name: string, labelText: string, type = "text") => {
      const label = this.htmlService.create(
        "label",
        ["form__label"],
        crypto.randomUUID(),
        labelText
      );
      const input = this.htmlService.create(
        "input",
        ["form__input"],
        crypto.randomUUID()
      );
      input.type = type;
      input.name = name;
      label.append(input);
      return label;
    };

    const entries = Object.entries(this.menuTagText);

    entries.forEach(([tag, text], index) => {
      const filterInput = makeInput(tag, text, "checkbox");
      this.element.appendChild(filterInput);
    });
    this.element.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this.element.addEventListener("change", (e) => {
      const formData = Object.fromEntries(new FormData(this.element));
      this.controller.onFilterChange(
        formData as unknown as MenuFilterSubmission
      );
    });
  }

  get component(): HTMLElement {
    return this.element;
  }
  onChange(event: MenuFilterEvent): void {
    if (event.type === MenuFilterEventType.START) {
      for (const [key, value] of Object.entries(event.menuFilterState)) {
        const inputElement = this.element.querySelector(
          `input[name=${key}]`
        )! as HTMLInputElement;
        inputElement.checked = value === "on";
      }
    } else {
      // do nothing to avoid accidental loops (updating the form updates the model which updates the form)
    }
  }
}
