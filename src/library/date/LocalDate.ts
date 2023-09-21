export class DayOfWeek {
    static SUNDAY = new DayOfWeek("Sunday", "Sun.", true, 0);
    static MONDAY = new DayOfWeek("Monday", "Mon.", false, 1);
    static TUESDAY = new DayOfWeek("Tuesday", "Tues.", false, 2);
    static WEDNESDAY = new DayOfWeek("Wednesday", "Wed.", false, 3);
    static THURSDAY = new DayOfWeek("Thursday", "Thu.", false, 4);
    static FRIDAY = new DayOfWeek("Friday", "Fri.", false, 5);
    static SATURDAY = new DayOfWeek("Saturday", "Sat.", true, 6);
    private static allDays = [
      DayOfWeek.SUNDAY,
      DayOfWeek.MONDAY,
      DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY,
      DayOfWeek.THURSDAY,
      DayOfWeek.FRIDAY,
      DayOfWeek.SATURDAY,
    ];
    constructor(private __name: string, private __shortName: string, private __isWeekend: boolean, private __number: number) {

    }
    get name() {
      return this.__name;
    }
    get shortName() {
      return this.__shortName;
    }
    get weekend() {
      return this.__isWeekend;
    }
    get number() {
      return this.__number;
    }
    static fromNumber(number: number) {
      return DayOfWeek.allDays.find((day) => day.number === number);
    }
  }
  export class LocalDate {
    private constructor(private jsDate: Date) {
    }
  
    get year() {
      return this.jsDate.getUTCFullYear();
    }
  
    get date() {
      return this.jsDate.getUTCDate();
    }
  
    get month() {
      return this.jsDate.getUTCMonth() + 1;
    }
  
    get day() {
      return this.jsDate.getUTCDay();
    }
  
    get dayOfWeek() {
      return DayOfWeek.fromNumber(this.day);
    }
  
    get weekend() {
      return this.jsDate.getUTCDay() === 0 || this.jsDate.getUTCDay() === 6;
    }
  
    millisecondsUntilNextDate() {
      const todayAsDate = new Date();
      const tomorrowDate =  new Date(`${todayAsDate.getFullYear()}-${pad(
        todayAsDate.getMonth() + 1
      )}-${pad(todayAsDate.getDate() + 1)}T00:00:00.000`)
      return tomorrowDate.getTime() - todayAsDate.getTime()
    }
  
    next() {
      const clonedDate = new Date(this.jsDate);
      clonedDate.setUTCDate(clonedDate.getUTCDate() + 1);
      const instance = new LocalDate(clonedDate);
      return instance;
    }
  
    prior() {
      const clonedDate = new Date(this.jsDate);
      clonedDate.setUTCDate(clonedDate.getUTCDate() - 1);
      const instance = new LocalDate(clonedDate);
      return instance;
    }
  
    toISOString() {
      return `${this.jsDate.getUTCFullYear()}-${pad(
        this.jsDate.getUTCMonth() + 1
      )}-${pad(this.jsDate.getUTCDate())}`;
    }
  
    toLocaleString() {
      return this.jsDate.toLocaleDateString(); // TODO test
    }
  
    isGreaterThan(otherLocalDate: LocalDate) {
      const yearGreater = this.year > otherLocalDate.year;
      const yearEqual = this.year === otherLocalDate.year;
      const monthGreater = this.month > otherLocalDate.month;
      const monthEqual = this.month === otherLocalDate.month;
      const dateGreater = this.date > otherLocalDate.date;
      const dateEqual = this.date === otherLocalDate.date;
      if (yearGreater) {
        return true;
      } else if (yearEqual && monthGreater) {
        return true;
      } else if (yearEqual && monthEqual && dateGreater) {
        return true;
      }
      return false;
    }
  
    isEqual(otherLocalDate: LocalDate) {
      const yearEqual = this.year === otherLocalDate.year;
      const monthEqual = this.month === otherLocalDate.month;
      const dateEqual = this.date === otherLocalDate.date;
      return yearEqual && monthEqual && dateEqual;
    }
  
    asNumber() {
      return this.jsDate.getTime();
    }
  
    clone() {
      const instance = new LocalDate(new Date(this.toISOString()));
      return instance;
    }
  
    isValid() {
      return true; // TODO
    }
  
  
  
    static today() {
      const todayAsDate = new Date();
      // Take today, get the user's year-month-date to initialize a LocalDate of today
      // If I did new LocalDate(new Date()), then the LocalDate would be whatever 'today' is in England
      const instance = LocalDate.fromISOString(
        `${todayAsDate.getFullYear()}-${pad(
          todayAsDate.getMonth() + 1
        )}-${pad(todayAsDate.getDate())}`
      );
      return instance;
    }
  
    static fromISOString(string: string) {
      const instance = new LocalDate(new Date(string));
      return instance;
    }
  }
  
  export function pad(number: number | string){
    const numberString = String(number);
    if (numberString.length < 2) {
      return `0${number}`;
    }
    return numberString;
  }

  
  