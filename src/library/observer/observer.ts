export interface Observer<T> {
    onChange(event: T): void
}

export class Observable<T> {
    private observers: Observer<T>[]  = []
    constructor() {

    }
    subscribe(observer: Observer<T>): void {
        this.observers.push(observer)
    }
    protected notifyAll(t: T): void {
        this.observers.forEach(observer => observer.onChange(t))
    }
}