import { Icon } from "../../app/component/view/Icon.js";
import injector from "../../app/injector/Injector.js";
import { AppTransition, CustomAnimation } from "../../transition/Transition.js";


export enum ToastMood {
    HAPPY = Icon.THUMBS_UP,
    SAD = Icon.THUMBS_DOWN,
    NEUTRAL = Icon.HELP
}

const moodConverter = new Map<ToastMood, string>()
moodConverter.set(ToastMood.HAPPY, "happy")
moodConverter.set(ToastMood.SAD, "sad")
moodConverter.set(ToastMood.NEUTRAL, "neutral")

export class ToastService {
    private static TIMEOUT = 3_000
    constructor(private htmlService = injector.getHtmlService()) {
        
    }
    showToast(message: string, mood: ToastMood = ToastMood.NEUTRAL): void {
        const dialog = this.htmlService.create("dialog", ["toast", `toast--${moodConverter.get(mood)}`]) as HTMLDialogElement
        const headerIcon = this.htmlService.create("span", ["icon", "toast__icon"], crypto.randomUUID(), mood);
        dialog.append(headerIcon)
        const messageBody = this.htmlService.create("pre", ["toast__body"])
        messageBody.textContent = message
        dialog.append(messageBody)
        const closeButton = this.htmlService.create("button", ["toast__option"], crypto.randomUUID(), Icon.CLOSE)
        closeButton.addEventListener("click", () =>{ this.close(dialog);})
        dialog.append(closeButton)
        this.htmlService.append(dialog)
        dialog.show()
        window.setTimeout(() => this.close(dialog), ToastService.TIMEOUT)
    }
    private close(dialog: HTMLDialogElement): void {
        new CustomAnimation(500, AppTransition.SLIDE_OUT, [() => {dialog.close(); dialog.remove()}], dialog).start()
    }
    
}