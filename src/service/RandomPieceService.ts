import { Piece } from "../game/model/Piece.js"

export class RandomPieceService {
    constructor() {}
    getRandomPiece(): Piece {
        return Math.ceil(Math.random() * 6)
    }
}