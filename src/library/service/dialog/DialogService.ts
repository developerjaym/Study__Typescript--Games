import { SystemIcon } from "../../SystemIcon.js";
import { Runnable } from "../../utility/Functions.js";
import { HTMLService } from "../HTMLService.js";


export class DialogService {
    constructor(private htmlService: HTMLService) {
        
    }
    showDialog(title: string, message: string, icon: SystemIcon = SystemIcon.MESSAGE, onClose: Runnable = () => {}): void {
        const dialog = this.htmlService.create("dialog") as HTMLDialogElement
        const dialogHeader = this.htmlService.create("header");
        const headerIcon = this.htmlService.create("span", ["icon", "header__icon"], "dialogHeaderIcon", icon);
        dialogHeader.append(headerIcon)
        const headerTitle = this.htmlService.create("h2")
        headerTitle.textContent = title
        dialogHeader.append(headerTitle)
        const closeButton = this.htmlService.create("button", ["header__option"], "dialogCloseButton", SystemIcon.CLOSE)
        closeButton.addEventListener("click", () =>{ dialog.close(); dialog.remove(); onClose() })
        dialogHeader.append(closeButton)
        dialog.append(dialogHeader)
        const messageBody = this.htmlService.create("pre")
        messageBody.textContent = message
        dialog.append(messageBody)
        this.htmlService.append(dialog)
        dialog.showModal()
    }
    
}