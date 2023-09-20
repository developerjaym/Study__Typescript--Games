import { BaseEnvironment } from "../../service/environment/Environment.js";

export interface AppEnvironment extends BaseEnvironment {
    width: number,
    height: number,
    pollPeriod: number,
    remoteUrl: string
}