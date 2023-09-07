import { StorageService } from "./StorageService.js";

export class LocalStorageService implements StorageService {
    static CLIENT_ID_KEY = "localstorage-client-id"
    constructor() {

    }
    async getClientId(): Promise<string> {
        return localStorage.getItem(LocalStorageService.CLIENT_ID_KEY) || ""
    }
    setClientId(newClientId: string) {
        localStorage.setItem(LocalStorageService.CLIENT_ID_KEY, newClientId)
    }

}