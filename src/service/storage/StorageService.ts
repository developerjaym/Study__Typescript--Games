export interface StorageService {
    getClientId(): Promise<string>;
    setClientId(id: string): void;
}