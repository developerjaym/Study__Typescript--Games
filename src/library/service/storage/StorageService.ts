export interface StorageService<T>{
  getClientId(): Promise<string>;
  setClientId(id: string): void;
  read(): Promise<T | null>;
  write(t: T): Promise<void>;
}
