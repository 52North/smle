import {AbstractTime} from './AbstractTime';
import {DisplayName} from '../../decorators/DisplayName';

export class TimeInstant extends AbstractTime {
    @DisplayName('Time')
    time: Date;

    toString() {
        if (this.time) {
            return this.time.toISOString();
        } else {
            return 'Time instant';
        }
    }
}
