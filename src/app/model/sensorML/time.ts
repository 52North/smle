

export type TimeInstant = Date;

export class TimePeriod {
    begin: TimeInstant;
    end: TimeInstant;
    constructor() {}
}

export type Time = TimeInstant | TimePeriod;