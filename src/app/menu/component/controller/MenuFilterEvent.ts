import { MenuOption } from "../model/MenuOption.js";
import { MenuFilterState } from "../model/MenuFilterState.js";

export enum MenuFilterEventType {
    START,
    FILTER
}

export interface MenuFilterEvent {
  type: MenuFilterEventType,
  menuOptions: MenuOption[],
  menuFilterState: MenuFilterState
}
