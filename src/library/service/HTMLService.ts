import { Page } from "../observer/Page.js";
import { Supplier } from "../utility/Functions.js";
import { BaseEnvironment } from "./environment/Environment.js";

export class HTMLService {
  private activePage?: Page;
  constructor(private document: Document, private env: BaseEnvironment) {}
  create<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    classes: string[] = [],
    id = `${crypto.randomUUID()}`,
    textContent = ""
  ): HTMLElementTagNameMap[K] {
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
    this.activePage?.onDestroy();
    this.activePage?.component?.remove();
    this.activePage = await elementSupplier();
    this.getRoot().replaceChildren()
    this.clearStylesheets(this.activePage.stylesheet);
    this.activePage.stylesheet.forEach(stylesheet => this.appendStylesheet(stylesheet));
    this.getRoot().replaceChildren(this.activePage.component);
    this.activePage.onInit()
  }
  private clearStylesheets(except: string[]): void {
    Array.from(this.document.head
      .querySelectorAll(".page-stylesheet"))
      .filter(element => !except.includes((element as HTMLLinkElement).href))
      .forEach((element) => element.remove());
  }
  private appendStylesheet(href: string): void {
    if (!href) {
      return;
    }
    const newStylesheet = document.createElement("link");
    newStylesheet.type = "text/css";
    newStylesheet.rel = "stylesheet";
    newStylesheet.href = `css/${href}`;
    newStylesheet.id = href;
    newStylesheet.classList.add("page-stylesheet");
    this.document.head.appendChild(newStylesheet);
  }
}
