import injector from "../../app/injector/Injector.js";
import { Page } from "../observer/Page.js";
import { Observable } from "../observer/observer.js";
import { HTMLService } from "../service/HTMLService.js";
import { Supplier } from "../utility/Functions.js";
import { RouterEvent } from "./RouterEvent.js";

class LoadingPage implements Page {
  constructor(private htmlService = injector.getHtmlService()) {

  }
  get stylesheet(): string[] {
    return ["loading.css"];
  }
  get component(): HTMLElement {
    return this.htmlService.create("div", [], crypto.randomUUID(), "Loading...");
  }
  onChange(event: RouterEvent): void {
   
  }
  
}

export class RouterService extends Observable<RouterEvent> {
  private map: Map<RegExp, Supplier<Promise<Page>>>;
  private defaultElementSupplier: Supplier<Promise<Page>>;
  constructor(private htmlService: HTMLService) {
    super();
    this.map = new Map<RegExp, Supplier<Promise<Page>>>();
    this.defaultElementSupplier = async () =>
      new LoadingPage()
  }
  /**
   * 
   * @param path A regex like  /^\/user\/(?<userId>\d+)$/
   * @param elementSupplier A function to supply an HTMLElement
   * @param isDefault This is the HTMLElement the user will see if the hash doesn't match any paths
   */
  add(
    path: RegExp,
    elementSupplier: Supplier<Promise<Page>>,
    isDefault = false
  ): void {
    this.map.set(path, elementSupplier);
    if (isDefault) {
      this.defaultElementSupplier = elementSupplier;
    }
  }
  start(): void {
    this.reactToHash()
    window.addEventListener("hashchange", (e) => this.reactToHash());
  }
  routeTo(route: string): void {
    window.location.hash = `#/${route}`
  }
  private reactToHash(): void {
    const currentHash = window.location.hash.slice(1); // Get the hash without the "#"
    for (const [pathRegex, elementSupplier] of Array.from(this.map.entries())) {
      const captureGroups = this.extractNamedCaptureGroups(
        pathRegex,
        currentHash
      );
      if (captureGroups) {
        this.load(elementSupplier, captureGroups)
        return; // Exit the loop after the first match
      }
    }
    // Haven't returned yet
    this.load(this.defaultElementSupplier)
  }
  private load(supplier: Supplier<Promise<Page>>, pathVariables:  { [x: string]: string; } = {}): void {
    this.htmlService.routeTo(supplier).then(
        () => this.notifyAll({ pathVariables })
        // Emit a RouterEvent with the matched element
      );
  }
  private extractNamedCaptureGroups(
    regex: RegExp,
    input: string
  ): Record<string, string> | null {
    const match = regex.exec(input);
    if (match) {
      // Extract named capture groups into an object
      const namedCaptureGroups = match.groups || {};
      return namedCaptureGroups;
    }
    return null;
  }
}
