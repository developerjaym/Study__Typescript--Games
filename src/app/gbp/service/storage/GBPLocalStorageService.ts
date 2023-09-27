import { GameEvent } from "../../component/model/GameEvent.js";
import { GameState } from "../../component/model/GameState.js";
import { GBPStorageService } from "./GBPStorageService.js";

export class GBPLocalStorageService implements GBPStorageService {
    private gameStateKey: string;
    constructor() {        
        this.gameStateKey = `GBP-game_state-key`
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
    async write(gameState: GameState): Promise<void> {
        localStorage.setItem(this.gameStateKey, JSON.stringify(gameState))
    }

}