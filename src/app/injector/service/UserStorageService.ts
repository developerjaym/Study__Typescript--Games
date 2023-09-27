
export interface UserStorageService  {
    getClientId(): Promise<string>;
    setClientId(id: string): void;
}