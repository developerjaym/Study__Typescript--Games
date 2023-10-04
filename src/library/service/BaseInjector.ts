import DateService from "../date/DateService.js";
import { RouterService } from "../router/RouterService.js";
import { HTMLService } from "./HTMLService.js";
import { URLService } from "./URLService.js";
import { DialogService } from "./dialog/DialogService.js";
import { BaseEnvironment } from "./environment/Environment.js";
import { NumberFormatService } from "./format/NumberFormatService.js";
import {
  ClipboardService,
  IClipboardService,
} from "./share/ClipboardService.js";
import { BaseShareService, ShareServiceFactory } from "./share/ShareService.js";
import { SocialShareService } from "./share/SocialShareService.js";
import { SoundEffectService } from "./sound/SoundEffectService.js";
import { ToastService } from "./toast/ToastService.js";

export abstract class BaseInjector<T extends BaseEnvironment> {
  protected htmlService: HTMLService;
  protected urlService: URLService;
  protected toastService: ToastService;
  protected dialogService: DialogService;
  protected shareService: BaseShareService;
  protected clipboardService: ClipboardService;
  protected socialShareService: SocialShareService;
  protected dateService: DateService;
  protected routerService: RouterService;
  protected soundEffectService: SoundEffectService;
  protected numberFormatService: NumberFormatService;
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
    this.routerService = new RouterService(this.htmlService);
    this.soundEffectService = new SoundEffectService();
    this.numberFormatService = new NumberFormatService();
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
  getRouterService(): RouterService {
    return this.routerService;
  }
  getSoundEffectService(): SoundEffectService {
    return this.soundEffectService;
  }
  getNumberFormatService(): NumberFormatService {
    return this.numberFormatService;
  }
}
