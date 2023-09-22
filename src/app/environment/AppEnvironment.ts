import { BaseEnvironment } from "../../library/service/environment/Environment.js";

export interface AppEnvironment extends BaseEnvironment {
    width: number,
    height: number,
    pollPeriod: number,
    remoteUrl: string
}