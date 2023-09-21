import { Observable } from "../observer/observer.js"
import { LocalDate, pad } from "./LocalDate.js"

export default class DateService extends Observable<{countdown: string, isNewDay: boolean}> {
    constructor() {
        super()
        this.startPolling()
    }
    daysSince(startDate: LocalDate) {
        // How many days since start date?
        const today = LocalDate.today()
        let nextDay = startDate.clone()
        let counter = 0
        while(today.isGreaterThan(nextDay)) {
            nextDay = nextDay.next()
            counter++;
        }
        return counter
    }
    private startPolling() {
        let lastDate = LocalDate.today()
        setInterval(() => {
            const today = LocalDate.today()
            const isNewDay  = today.isGreaterThan(lastDate)
            const countdown = this.convertMillisecondsToString(lastDate.millisecondsUntilNextDate())
            super.notifyAll({countdown, isNewDay })
            if(isNewDay) {
                lastDate = today
            }
        }, 100)
    }
    private convertMillisecondsToString(ms: number) {
        const seconds = ms / 1000;
        const hours = seconds / 3600
        const minutes = (hours - Math.floor(hours)) * 60
        return `${pad(Math.floor(hours))}:${pad(Math.floor(minutes))}`
      }
}
