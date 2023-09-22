export interface JayrrowsStorageService {
    getClientId(): Promise<string>;
    setClientId(id: string): void;
}