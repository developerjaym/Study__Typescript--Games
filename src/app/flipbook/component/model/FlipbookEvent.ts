export interface FlipbookEvent {
    entities: FlipbookEntity[],
    background: string,
    type: FlipbookEventType
}

export interface FlipbookPage {
    entities: FlipbookEntity[],
    background: string
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
    ENTITY_CHANGE,
    BACKGROUND_CHANGE,
    PAGE_CREATED,
    PAGE_FOCUS_CHANGE
}

export interface FlipbookEntity {
    name: string,
    image: string,
    size: FlipbookSize,
    position: FlipbookCoordinates
}