import { UserStorageService } from "./UserStorageService.js";

export class LocalUserStorageService implements UserStorageService {
    static CLIENT_ID_KEY = "localstorage-client-id"
    async getClientId(): Promise<string> {
        return localStorage.getItem(LocalUserStorageService.CLIENT_ID_KEY) || ""
    }
    setClientId(newClientId: string) {
        localStorage.setItem(LocalUserStorageService.CLIENT_ID_KEY, newClientId)
    }   
}