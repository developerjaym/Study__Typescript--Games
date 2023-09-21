export interface StorageService<T>{
  getClientId(): Promise<string>;
  setClientId(id: string): void;
  read(): T | null;
  write(t: T): void;
}
