export interface StorageService<T>{
  read(): Promise<T | null>;
  write(t: T): Promise<void>;
}
