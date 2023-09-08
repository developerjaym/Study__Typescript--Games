import { GameEvent } from "../../game/model/GameEvent.js";
import { GameState } from "../../game/model/GameState.js";
import injector from "../Injector.js";
import { StorageService } from "./StorageService.js";

export class LocalStorageService implements StorageService {
    static CLIENT_ID_KEY = "localstorage-client-id"
    private gameStateKey: string;
    constructor(private env = injector.getEnvironment()) {        
        this.gameStateKey = `${this.env.appName}-game_state-key`
    }
    getGameState(): GameState | null {
        const gameStateString = localStorage.getItem(this.gameStateKey)
        if(gameStateString) {
            return JSON.parse(gameStateString)
        }
        return null
    }
    onChange(event: GameEvent): void {
        const gameState: GameState = {
            board: event.board,
            players: event.players,
            activePlayer: event.activePlayer,
            displaySquare: event.displaySquare,
            sequences: event.sequences
        }
        localStorage.setItem(this.gameStateKey, JSON.stringify(gameState))
    }
    async getClientId(): Promise<string> {
        return localStorage.getItem(LocalStorageService.CLIENT_ID_KEY) || ""
    }
    setClientId(newClientId: string) {
        localStorage.setItem(LocalStorageService.CLIENT_ID_KEY, newClientId)
    }

}