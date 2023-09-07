import { Observer } from "../../observer/observer.js";
import { GameEvent } from "../model/GameEvent.js";

export interface Viewable extends Observer<GameEvent> {
    get component(): HTMLElement;
}