import { Observer } from "../../observer/observer.js";

export interface StorageService<T> extends Observer<T>{
  getClientId(): Promise<string>;
  setClientId(id: string): void;
  read(): T | null;
}
