import { GameEvent } from "../../component/model/GameEvent.js";
import { GameState } from "../../component/model/GameState.js";
import { JayrrowsStorageService } from "./JayrrowsStorageService.js";

export class JayrrowsLocalStorageService implements JayrrowsStorageService {
    private gameStateKey: string;
    constructor() {
        this.gameStateKey = 'JAYRROWS-game_state-key'
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
        }
        this.write(gameState)
    }
    async write(gameState: GameState): Promise<void> {
        localStorage.setItem(this.gameStateKey, JSON.stringify(gameState))
    }
}