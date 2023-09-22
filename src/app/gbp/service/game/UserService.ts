import injector from "../../../injector/Injector.js"

export class UserService {
    constructor(private storageService = injector.getGBPStorageService()) {

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