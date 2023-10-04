export class NumberFormatService {
    constructor(private language = window.navigator.language) {
    }
    formatCurrency(amount: number, currency: string = 'USD', language: string = this.language): string {
        return new Intl.NumberFormat(language, { style: 'currency', currency: currency }).format(amount);
    }
}