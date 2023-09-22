import { Coordinate } from "./Coordinate.js";
import { Piece } from "./Piece.js";
import { Player } from "./Player.js";

export interface Square {
    player: Player | null,
    piece: Piece | null,
    selected: boolean,
    coordinate: Coordinate
}