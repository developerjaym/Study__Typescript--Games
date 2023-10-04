import { SlotResult } from "../../component/event/SlotEvent.js";

export interface WinningsDrawer {
    get component(): HTMLElement;
    append(results: SlotResult): void;
}