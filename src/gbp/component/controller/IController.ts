import { UserEvent } from "./UserEvent.js";

export interface IController {
    onEvent(event: UserEvent): void;
}