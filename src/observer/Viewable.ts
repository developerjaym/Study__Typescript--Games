import { Observer } from "./observer.js";

export interface Viewable<T> extends Observer<T> {
    get component(): HTMLElement;
}