import { Observer } from "../../../../library/observer/observer.js";
import { StorageService } from "../../../../library/service/storage/StorageService.js";
import { GameEvent } from "../../../component/model/GameEvent.js";
import { GameState } from "../../../component/model/GameState.js";
import injector from "../../Injector.js";
import { GBPStorageService } from "./GBPStorageService.js";

export class LocalStorageService implements GBPStorageService {
    static CLIENT_ID_KEY = "localstorage-client-id"
    private gameStateKey: string;
    constructor(private env = injector.getEnvironment()) {        
        this.gameStateKey = `${this.env.appName}-game_state-key`
    }
    read(): GameState | null {
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
        this.write(gameState)
    }
    async getClientId(): Promise<string> {
        return localStorage.getItem(LocalStorageService.CLIENT_ID_KEY) || ""
    }
    setClientId(newClientId: string) {
        localStorage.setItem(LocalStorageService.CLIENT_ID_KEY, newClientId)
    }
    write(gameState: GameState): void {
        localStorage.setItem(this.gameStateKey, JSON.stringify(gameState))
    }

}