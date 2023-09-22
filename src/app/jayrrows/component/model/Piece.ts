import { Coordinate } from "./Coordinate.js"

export enum Piece {
    HORIZONTAL,
    VERTICAL,
    DIAGONAL,
    ALL,
    KING
}

interface LegalMove extends Coordinate {

}

const MOVEMENT = {
    HORIZONTAL: [{x: 1, y: 0}, {x: -1, y: 0}],
    DIAGONAL: [{x: 1, y: 1}, {x: -1, y: -1}, {x: 1, y: -1}, {x: -1, y: 1}],
    VERTICAL: [{x: 0, y: 1}, {x: 0, y: -1}]
}

enum Direction {
    HORIZONTAL,
    VERTICAL,
    DIAGONAL,
}

const directions = [
    {
        direction: Direction.DIAGONAL,
        movement: MOVEMENT.DIAGONAL
    },
    {
        direction: Direction.VERTICAL,
        movement: MOVEMENT.VERTICAL
    },
    {
        direction: Direction.HORIZONTAL,
        movement: MOVEMENT.HORIZONTAL
    }
]


const pieceToMovements = new Map<Piece | null, LegalMove[]>()
pieceToMovements.set(Piece.KING, [])
pieceToMovements.set(Piece.ALL, [...MOVEMENT.HORIZONTAL, ...MOVEMENT.VERTICAL, ...MOVEMENT.DIAGONAL])
pieceToMovements.set(Piece.HORIZONTAL, MOVEMENT.HORIZONTAL)
pieceToMovements.set(Piece.VERTICAL, MOVEMENT.VERTICAL)
pieceToMovements.set(Piece.DIAGONAL, MOVEMENT.DIAGONAL)
pieceToMovements.set(null, [])

const movementToPieces = new Map<Direction, Piece>()
movementToPieces.set(Direction.DIAGONAL, Piece.DIAGONAL)
movementToPieces.set(Direction.HORIZONTAL, Piece.HORIZONTAL)
movementToPieces.set(Direction.VERTICAL, Piece.VERTICAL)

const getLegalMoves = (piece: Piece | null): LegalMove[] => pieceToMovements.get(piece) || []

const determineDirection = (xDiff: number, yDiff: number): Direction => {
    return directions.find(direction => direction.movement.find(({x, y}) => xDiff === x && yDiff === y))!.direction
}

const determinePromotion = (xDiff: number, yDiff: number): Piece => {
    const direction = determineDirection(xDiff, yDiff)
    return movementToPieces.get(direction)!
}


export {getLegalMoves, determinePromotion}