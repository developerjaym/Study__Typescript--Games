import { HTMLService } from "./HTMLService.js";
import { URLService } from "./URLService.js";
import { DialogService } from "./dialog/DialogService.js";
import { BaseEnvironment } from "./environment/Environment.js";
import { ToastService } from "./toast/ToastService.js";

export abstract class BaseInjector<T extends BaseEnvironment> {
  private htmlService: HTMLService;
  private urlService: URLService;
  private toastService: ToastService;
  private dialogService: DialogService;
  protected env: T;
  constructor(env: T) {
    this.env = env;
    this.htmlService = new HTMLService(document, this.env);
    this.urlService = new URLService();
    this.dialogService = new DialogService(this.htmlService)
    this.toastService = new ToastService(this.htmlService)
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
  getToastService(): ToastService {
    return this.toastService;
  }
  getDialogService(): DialogService {
    return this.dialogService;
  }
}
