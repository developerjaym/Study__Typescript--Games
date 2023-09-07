import injector from "./Injector.js";
import { StorageService } from "./storage/StorageService.js";

export class UserService {
    constructor(private storageService: StorageService = injector.getStorageService()) {

    }

    async getUserId() {
        let clientId = await this.storageService.getClientId()
        if(!clientId) {
            clientId = crypto.randomUUID()
            this.storageService.setClientId(clientId)
        }
        return clientId
    }
}