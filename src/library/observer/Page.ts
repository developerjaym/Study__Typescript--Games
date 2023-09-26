import { RouterEvent } from "../router/RouterEvent.js";
import { Viewable } from "./Viewable.js";

export interface Page extends Viewable<RouterEvent> {
    get stylesheet(): string[];
}