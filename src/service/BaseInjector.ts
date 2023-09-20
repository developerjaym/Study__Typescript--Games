import { HTMLService } from "./HTMLService.js";
import { URLService } from "./URLService.js";
import { BaseEnvironment } from "./environment/Environment.js";

export abstract class BaseInjector<T extends BaseEnvironment> {
  private htmlService: HTMLService;
  private urlService: URLService;
  protected env: T;
  constructor(env: T) {
    this.env = env;
    this.htmlService = new HTMLService(document, this.env);
    this.urlService = new URLService();
  }
  abstract initialize(): Promise<void>;
  getEnvironment(): T {
    return this.env;
  }
  getHtmlService(): HTMLService {
    return this.htmlService;
  }
  getURLService(): URLService {
    return this.urlService;
  }
}
