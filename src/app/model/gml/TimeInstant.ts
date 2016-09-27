import { AbstractTime } from './AbstractTime';
import { DisplayName } from '../../decorators/DisplayName';

export class TimeInstant extends AbstractTime {
    @DisplayName('Time')
    time: Date;

    toString() {
        if (this.time) {
            return this.time.toLocaleString().replace(/ /g, '\xa0');
        } else {
            return 'Time instant';
        }
    }
}
