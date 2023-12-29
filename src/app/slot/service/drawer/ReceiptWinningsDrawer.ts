import injector from "../../../injector/Injector.js";
import { SlotResult } from "../../component/event/SlotEvent.js";
import { SoundEffect } from "../../sound/SoundEffect.js";
import { WinningsDrawer } from "./WinningsDrawer.js";

export class ReceiptWinningsDrawer implements WinningsDrawer {
    private container: HTMLElement;
    private receiptDetails: HTMLElement;
    private receipt: HTMLElement
    private hasBegunPrinting = false;
    constructor(private htmlService = injector.getHtmlService(), private soundEffectService = injector.getSoundEffectService(), private numberFormatService = injector.getNumberFormatService()) {
        this.container = this.htmlService.create("div", ["printer"])
        this.receipt = this.htmlService.create("div", ["receipt", "print"])
        this.receiptDetails = this.htmlService.create("section", ["receipt__body"])
        this.receipt.append(this.receiptDetails)
        const header = this.htmlService.create("header", ["receipt__header"])
        const headerTitle = this.htmlService.create("h2", ["receipt__title"], crypto.randomUUID(), `RECEIPT`)
        header.append(headerTitle)
        this.receipt.append(header)
    }
    get component(): HTMLElement {
        return this.container
    }
    append(result: SlotResult): void {
        if(!this.hasBegunPrinting) {
            this.container.append(this.receipt)
            this.hasBegunPrinting = true;
        }

        this.receiptDetails.prepend(this.drawLineItem(result))
        this.soundEffectService.get(SoundEffect.RECEIPT).play()
    }
    private drawLineItem(result: SlotResult): HTMLElement {
        const lineItem = this.htmlService.create("section", ["receipt__line"])

        const date = this.htmlService.create("span", ["receipt__detail", "receipt__detail--date", "receipt__date"], crypto.randomUUID(), `${new Date().toLocaleTimeString()}`)
        const winningsElement = this.htmlService.create("span", ["receipt__detail", "receipt__detail--winnings", "receipt__date"], crypto.randomUUID(), this.numberFormatService.formatCurrency(result.winnings))
        lineItem.append(date, winningsElement)
        return lineItem;
    }
    
}