
export enum AppTransition {
    SLIDE_IN = "slide-in",
    SLIDE_OUT = "slide-out",
    EXPAND = "expand",
    CONTRACT = "contract"
}

export class CustomAnimation {
    constructor(private duration: number, private transition: AppTransition, private steps: Function[], private element: HTMLElement) {

    }
    start(): void {
        this.element.classList.add(this.transition)
        this.element.style.animationDuration = `${this.duration}ms`
        const msBetweenSteps = Math.floor(this.duration / this.steps.length)
        this.next(this.steps, msBetweenSteps)
        window.setTimeout(() => {
            this.element.classList.remove(this.transition)
            this.element.style.animationDuration = `auto`
        }, this.duration)
    }
    private next(steps: Function[], inMS: number): void {
        window.setTimeout(() => {
            this.steps.shift()?.call(this)
            this.next(steps, inMS)
        }, inMS)
    }
}