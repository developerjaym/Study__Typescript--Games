import { Consumer } from "../../utility/Functions.js";
import { BaseShareService } from "./ShareService.js";

export interface IClipboardService {
    copy(
        shareString: string,
        onSuccess: Consumer<string>,
        onFailure: Consumer<string>
      ): void;
}

export class ClipboardService extends BaseShareService implements IClipboardService {
  constructor(url: string) {
    super(url);
  }
  share(
    title: string,
    text: string,
    onSuccess: Consumer<string>,
    onFailure: Consumer<string>
  ): void {
    this.copy(`${text}\n${this.url}`, onSuccess, onFailure)
  }
  copy(
    shareString: string,
    onSuccess: Consumer<string> = (s) => {},
    onFailure: Consumer<string> = (e) => console.error(e)
  ): void {
    const canCopy = Boolean(navigator && navigator.clipboard.writeText);
    if (canCopy) {
      navigator.clipboard.writeText(shareString).then(
        () => onSuccess("Successfully Copied"),
        (e) => onFailure("ERROR: Failed to Copy " + e)
      );
    } else {
      onFailure("ERROR: Failed to Copy");
    }
  }
}
