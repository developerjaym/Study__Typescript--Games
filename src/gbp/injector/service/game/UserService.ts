import injector from "../../Injector.js"

export class UserService {
    constructor(private storageService = injector.getStorageService()) {

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