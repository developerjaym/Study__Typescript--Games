
import { SystemIcon } from "../../SystemIcon.js";
import { AppTransition, CustomAnimation } from "../../transition/Transition.js";
import { HTMLService } from "../HTMLService.js";


export enum ToastMood {
    HAPPY = SystemIcon.THUMBS_UP,
    SAD = SystemIcon.THUMBS_DOWN,
    NEUTRAL = SystemIcon.HELP
}

const moodConverter = new Map<ToastMood, string>()
moodConverter.set(ToastMood.HAPPY, "happy")
moodConverter.set(ToastMood.SAD, "sad")
moodConverter.set(ToastMood.NEUTRAL, "neutral")

export class ToastService {
    private static TIMEOUT = 3_000
    constructor(private htmlService: HTMLService) {
        
    }
    showToast(message: string, mood: ToastMood = ToastMood.NEUTRAL): void {
        const dialog = this.htmlService.create("dialog", ["toast", `toast--${moodConverter.get(mood)}`])
        const headerIcon = this.htmlService.create("span", ["icon", "toast__icon"], crypto.randomUUID(), mood);
        dialog.append(headerIcon)
        const messageBody = this.htmlService.create("pre", ["toast__body"])
        messageBody.textContent = message
        dialog.append(messageBody)
        const closeButton = this.htmlService.create("button", ["toast__option"], crypto.randomUUID(), SystemIcon.CLOSE)
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