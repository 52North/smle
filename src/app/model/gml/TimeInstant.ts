import {AbstractTime} from './AbstractTime';

export class TimeInstant extends AbstractTime {
    time: Date;

    toString() {
        if (this.time) {
            return this.time.toISOString();
        } else {
            return 'Time instant';
        }
    }
}
