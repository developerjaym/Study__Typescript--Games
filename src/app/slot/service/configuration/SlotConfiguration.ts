
export interface WheelConfiguration {
    type: "ICON" | "IMAGE",
    image: string,
    alt: string
}
export interface MatchConfiguration {
    faceTypes: number[],
    name: string,
    shortName: string,
    message: string,
    orderMatters: boolean,
    sound: string,
    multiplier: number,
    icon: string
}
export interface SlotConfiguration {
    wheels: WheelConfiguration[][],
    matches: MatchConfiguration[]
}