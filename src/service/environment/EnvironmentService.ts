import { Environment } from "./Environment.js"

export class EnvironmentService {
    private data: Environment | null;
    constructor() {
        this.data = null
    }
    async load() {
        const response = await fetch("./environment/environment.json")
        const json = await response.json()
        this.data =  json
        return json
    }
    get env(): Environment {
        return this.data!
    }
}