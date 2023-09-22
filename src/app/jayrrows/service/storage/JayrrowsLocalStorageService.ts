import { JayrrowsStorageService } from "./JayrrowsStorageService.js";

export class JayrrowsLocalStorageService implements JayrrowsStorageService {
    static CLIENT_ID_KEY = "localstorage-client-id"
    constructor() {

    }
    async getClientId(): Promise<string> {
        return localStorage.getItem(JayrrowsLocalStorageService.CLIENT_ID_KEY) || ""
    }
    setClientId(newClientId: string) {
        localStorage.setItem(JayrrowsLocalStorageService.CLIENT_ID_KEY, newClientId)
    }

}