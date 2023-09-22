import { Supplier } from "../utility/Functions.js";
import { BaseEnvironment } from "./environment/Environment.js";

export class HTMLService {
  constructor(private document: Document, private env: BaseEnvironment) {}
  create(
    tag: string,
    classes: string[] = [],
    id = `${crypto.randomUUID()}`,
    textContent = ""
  ): HTMLElement | HTMLDialogElement {
    const element = this.document.createElement(tag);
    element.classList.add(...classes);
    element.id = id;
    element.textContent = textContent;
    return element;
  }
  getRoot(): HTMLElement {
    const id: string = this.env.rootElementId;
    return this.document.getElementById(id)!;
  }

  append(element: HTMLElement): void {
    this.getRoot().appendChild(element);
  }

  async routeTo(
    elementSupplier: Supplier<Promise<HTMLElement>>
  ): Promise<void> {
    const spinner = this.create(
      "div",
      ["spinner"],
      "routingSpinner",
      "Loading..."
    );
    this.getRoot().replaceChildren(spinner);

    const element = await elementSupplier();
    this.getRoot().replaceChildren(element);
  }
}
