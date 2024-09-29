export interface FlipbookEvent {
    sky: FlipbookEntity[],
    horizon: FlipbookEntity[],
    ground: FlipbookEntity[],
    type: FlipbookEventType,
    crosshairs: FlipbookCoordinates,
}

export interface FlipbookEventBackground {
    image: string,
    size: FlipbookSize
}

export interface FlipbookCoordinates {
    x: number,
    y: number
}

export interface FlipbookSize {
    height: number,
    width: number
}

export enum FlipbookEventType {
    SHOT_FIRED,
    MOVEMENT
}

export enum FlipbookEntityStatus {
    ALIVE,
    DEAD,
    HURT
}

export interface FlipbookEntity {
    name: string,
    image: string,
    size: FlipbookSize,
    status: FlipbookEntityStatus,
    position: FlipbookCoordinates,
    speed: FlipbookCoordinates
}