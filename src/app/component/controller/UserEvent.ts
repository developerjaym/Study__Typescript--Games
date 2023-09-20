import { Coordinate } from "../model/Coordinate.js";

export enum UserEventType {
    SELECT,
    UNDO,
    END_GAME
}

export interface UserEvent {
    id?: string,
    type: UserEventType,
    origin?: string,
    coordinate?: Coordinate
}