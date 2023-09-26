import { Page } from "../observer/Page.js";
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

  async routeTo(elementSupplier: Supplier<Promise<Page>>): Promise<void> {
    const spinner = this.create(
      "div",
      ["spinner"],
      "routingSpinner",
      "Loading..."
    );
    this.getRoot().replaceChildren(spinner);

    const page = await elementSupplier();
    this.clearStylesheets()
    this.appendStylesheet(page.stylesheet)
    this.getRoot().replaceChildren(page.component);
  }
  private clearStylesheets(): void {
    this.document.head.querySelectorAll(".page-stylesheet").forEach(element => element.remove())
  }
  private appendStylesheet(href: string): void {
    if(!href) {
      return;
    }
    const newStylesheet = document.createElement("link");
    newStylesheet.type = "text/css";
    newStylesheet.rel = "stylesheet";
    newStylesheet.href = `css/${href}`;
    newStylesheet.id = href;
    newStylesheet.classList.add("page-stylesheet")
    this.document.head.appendChild(newStylesheet);
  }
}
