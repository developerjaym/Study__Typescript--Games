export interface FlipbookEvent {
    pages: FlipbookPage[],
    type: FlipbookEventType,
    focused: string
}

export interface FlipbookPage {
    entities: FlipbookEntity[],
    background: string,
    name: string,
    id: string
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
    PAGE_FOCUS_CHANGE,
    START
}

export interface FlipbookEntity {
    name: string,
    image: string,
    size: FlipbookSize,
    position: FlipbookCoordinates
}