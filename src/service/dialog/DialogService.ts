import { Icon } from "../../app/component/view/Icon.js";
import injector from "../../app/injector/Injector.js";


export class DialogService {
    constructor(private htmlService = injector.getHtmlService()) {
        
    }
    showDialog(title: string, message: string, icon: Icon = Icon.MESSAGE, onClose: Function = () => {}): void {
        const dialog = this.htmlService.create("dialog") as HTMLDialogElement
        const dialogHeader = this.htmlService.create("header");
        const headerIcon = this.htmlService.create("span", ["icon", "header__icon"], "dialogHeaderIcon", icon);
        dialogHeader.append(headerIcon)
        const headerTitle = this.htmlService.create("h2")
        headerTitle.textContent = title
        dialogHeader.append(headerTitle)
        const closeButton = this.htmlService.create("button", ["header__option"], "dialogCloseButton", Icon.CLOSE)
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