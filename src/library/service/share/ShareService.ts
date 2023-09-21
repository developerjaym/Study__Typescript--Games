import { Consumer } from "../../utility/Functions.js";
import { ClipboardService } from "./ClipboardService.js";
import { SocialShareService } from "./SocialShareService.js";

export abstract class BaseShareService {
  constructor(protected url: string) {}
  abstract share(
    title: string,
    text: string,
    onSuccess: Consumer<string>,
    onFailure: Consumer<string>
  ): void;
}

export class ShareServiceFactory {
  constructor(private clipboardService: ClipboardService, private socialShareService: SocialShareService) {}
  getShareService(): BaseShareService {
    const canSocialShare = Boolean(navigator.share);
    if (canSocialShare) {
      return this.socialShareService;
    }
    return this.clipboardService;
  }
}
