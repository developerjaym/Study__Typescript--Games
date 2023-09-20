import { Icon } from "../app/component/view/Icon.js";
import injector from "../app/injector/Injector.js";
import { BaseEnvironment } from "./environment/Environment.js";

export class HTMLService {
    constructor(private document: Document, private env: BaseEnvironment = injector.getEnvironment()) {
        
    }
    create(tag: string, classes: string[] = [], id = `${crypto.randomUUID()}`, textContent=""): HTMLElement | HTMLDialogElement {
        const element = this.document.createElement(tag)
        element.classList.add(...classes)
        element.id = id
        element.textContent = textContent
        return element;
    }
    getRoot(): HTMLElement {
        const id: string = this.env.rootElementId
        return this.document.getElementById(id)!
    }

    append(element: HTMLElement): void {
        this.getRoot().appendChild(element)
    }
}