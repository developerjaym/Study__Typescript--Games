import { Observer } from "./observer.js";

export abstract class AbstractSnapshotter<T> implements Observer<T> {
  abstract onChange(event: T): void ;
  protected snapshots: T[] = [];
  private popCounter = 2;
  hasPreviousStates(): boolean {
    return this.snapshots.length >= this.popCounter;
  }
  pop(): T {
    let popped = null;
    for (let i = 0; i < this.popCounter; i++) {
      popped = this.snapshots.pop();
    }
    
    return popped!;
  }
}