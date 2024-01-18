import { Coordinate } from "./Coordinate.js";
import { Player } from "./Player.js";

export interface Square {
    player: Player | null,
    coordinate?: Coordinate
}