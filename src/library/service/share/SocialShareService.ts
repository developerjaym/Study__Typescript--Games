import { Consumer } from "../../utility/Functions.js";
import { BaseShareService } from "./ShareService.js";

export class SocialShareService extends BaseShareService {
  constructor(url: string) {
    super(url);
  }
  share(
    title: string,
    text: string,
    onSuccess: Consumer<string>,
    onFailure: Consumer<string>
  ): void {
    if (!navigator.share) {
      onFailure("No share ability");
      return;
    }

    navigator
      .share({ title, text, url: this.url })
      .then(() => onSuccess("Successfully Shared"), onFailure);
  }
}
