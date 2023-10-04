export class SoundEffectService {
    constructor() {

    }
    get(url: string): HTMLAudioElement {
        return new Audio(url)
    }
}