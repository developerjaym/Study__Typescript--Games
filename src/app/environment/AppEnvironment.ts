import { BaseEnvironment } from "../../library/service/environment/Environment.js";

export interface AppEnvironment extends BaseEnvironment {
    gbp_width: number,
    gbp_height: number,
    jayrrows_height: number,
    jayrrows_width: number
}