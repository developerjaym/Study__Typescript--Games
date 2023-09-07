export interface Player {
    id: boolean,
    name: string,
    victor: boolean,
    lowScore: number,
    highScore: number,
    clientId?: string
}

export class PlayerHelper {
    static createPlayers(): Player[] {
        return [this.createPlayer(true, "Green"), this.createPlayer(false, "Purple")]
    }
    static createPlayer(id: boolean, name: string, clientId?: string): Player {
        return {
            id,
            clientId,
            name,
            lowScore: 0,
            highScore: 0,
            victor: false
        }
    }
}