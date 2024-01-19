import { Runnable } from "../utility/Functions.js"

export enum AppTransition {
    SLIDE_IN = "slide-in",
    SLIDE_OUT = "slide-out",
    EXPAND = "expand",
    CONTRACT = "contract"
}

export class CustomAnimation {
    constructor(private duration: number, private transition: AppTransition | string, private steps: Runnable[], private element: HTMLElement) {

    }
    start(): void {
        this.element.classList.add(this.transition)
        this.element.style.animationDuration = `${this.duration}ms`
        // adjust msBetweenSteps by 2 to prevent flash of a removed element
        const msBetweenSteps = Math.floor(this.duration / this.steps.length) - 2
        this.next(this.steps, msBetweenSteps)
        window.setTimeout(() => {
            this.element.classList.remove(this.transition)
            this.element.style.animationDuration = `auto`
        }, this.duration)
    }
    private next(steps: Runnable[], inMS: number): void {
        window.setTimeout(() => {
            this.steps.shift()?.call(this)
            this.next(steps, inMS)
        }, inMS)
    }
}