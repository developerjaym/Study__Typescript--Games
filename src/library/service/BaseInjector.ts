import DateService from "../date/DateService.js";
import { HTMLService } from "./HTMLService.js";
import { URLService } from "./URLService.js";
import { DialogService } from "./dialog/DialogService.js";
import { BaseEnvironment } from "./environment/Environment.js";
import {
  ClipboardService,
  IClipboardService,
} from "./share/ClipboardService.js";
import { BaseShareService, ShareServiceFactory } from "./share/ShareService.js";
import { SocialShareService } from "./share/SocialShareService.js";
import { ToastService } from "./toast/ToastService.js";

export abstract class BaseInjector<T extends BaseEnvironment> {
  private htmlService: HTMLService;
  private urlService: URLService;
  private toastService: ToastService;
  private dialogService: DialogService;
  private shareService: BaseShareService;
  private clipboardService: ClipboardService;
  private socialShareService: SocialShareService;
  private dateService: DateService;
  protected env: T;
  constructor(env: T) {
    this.env = env;
    this.htmlService = new HTMLService(document, this.env);
    this.urlService = new URLService();
    this.dialogService = new DialogService(this.htmlService);
    this.toastService = new ToastService(this.htmlService);
    this.clipboardService = new ClipboardService(this.env.shareURL);
    this.socialShareService = new SocialShareService(this.env.shareURL);
    this.shareService = new ShareServiceFactory(
      this.clipboardService,
      this.socialShareService
    ).getShareService();
    this.dateService = new DateService();
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
  getShareService(): BaseShareService {
    return this.shareService;
  }
  getClipboardService(): IClipboardService {
    return this.clipboardService;
  }
  getDateService(): DateService {
    return this.dateService;
  }
}
