import { Observable } from "../observer/observer.js";
import { HTMLService } from "../service/HTMLService.js";
import { Supplier } from "../utility/Functions.js";
import { RouterEvent } from "./RouterEvent.js";

export class RouterService extends Observable<RouterEvent> {
  private map: Map<RegExp, Supplier<Promise<HTMLElement>>>;
  private defaultElementSupplier: Supplier<Promise<HTMLElement>>;
  constructor(private htmlService: HTMLService) {
    super();
    this.map = new Map<RegExp, Supplier<Promise<HTMLElement>>>();
    this.defaultElementSupplier = async () =>
      this.htmlService.create("div", [], crypto.randomUUID(), "Loading...");
  }
  /**
   * 
   * @param path A regex like  /^\/user\/(?<userId>\d+)$/
   * @param elementSupplier A function to supply an HTMLElement
   * @param isDefault This is the HTMLElement the user will see if the hash doesn't match any paths
   */
  add(
    path: RegExp,
    elementSupplier: Supplier<Promise<HTMLElement>>,
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
  private load(supplier: Supplier<Promise<HTMLElement>>, pathVariables:  { [x: string]: string; } = {}): void {
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
