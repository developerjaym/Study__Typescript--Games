export interface HuntEvent {
    sky: HuntEntity[],
    horizon: HuntEntity[],
    ground: HuntEntity[],
    type: HuntEventType,
    crosshairs: HuntCoordinates,
    // background: HuntEventBackground
    // I need to know what is on the sky
    // I need to know what is on the horizon
    // I need to know what is on the ground
    // I need to know what the background looks like
    // I need to know if I should draw some sort of shot effect
    // I need to know if I should play some sound clip
}

// TODO, for more efficiency, the event should just include the "area(s)" that have had a change

// export interface HuntLayer {
//     name: string,
//     size: HuntSize,
//     entities: HuntEntity[]
// }

export interface HuntEventBackground {
    image: string,
    size: HuntSize
}

export interface HuntCoordinates {
    x: number,
    y: number
}

export interface HuntSize {
    height: number,
    width: number
}

export enum HuntEventType {
    SHOT_FIRED,
    MOVEMENT
}

export enum HuntEntityStatus {
    ALIVE,
    DEAD,
    HURT
}

export interface HuntEntity {
    name: string,
    image: string,
    size: HuntSize,
    status: HuntEntityStatus,
    position: HuntCoordinates,
    speed: HuntCoordinates
}