import {DateType} from './DateType';

export class IsoDate {
    type: DateType;
    date: Date;

    toString() {
        return this.date ? this.date.toISOString() : 'IsoDate';
    }
}
