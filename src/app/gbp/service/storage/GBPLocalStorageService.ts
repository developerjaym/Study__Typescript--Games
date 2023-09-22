import { GameEvent } from "../../component/model/GameEvent.js";
import { GameState } from "../../component/model/GameState.js";
import injector from "../../../injector/Injector.js";
import { GBPStorageService } from "./GBPStorageService.js";

export class GBPLocalStorageService implements GBPStorageService {
    static CLIENT_ID_KEY = "localstorage-client-id"
    private gameStateKey: string;
    constructor(private env = injector.getEnvironment()) {        
        this.gameStateKey = `${this.env.appName}-game_state-key`
    }
    async read(): Promise<GameState | null> {
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
        return localStorage.getItem(GBPLocalStorageService.CLIENT_ID_KEY) || ""
    }
    setClientId(newClientId: string) {
        localStorage.setItem(GBPLocalStorageService.CLIENT_ID_KEY, newClientId)
    }
    async write(gameState: GameState): Promise<void> {
        localStorage.setItem(this.gameStateKey, JSON.stringify(gameState))
    }

}