import { AbstractTime } from './AbstractTime';
import { DisplayName } from '../../decorators/DisplayName';

export class TimeInstant extends AbstractTime {
    @DisplayName('Time')
    time: Date;

    toString() {
        return 'Time instant';
    }

    getLabel() {
        return this.toString();
    }

    getValue() {
        return this.time.toLocaleString().replace(/ /g, '\xa0');
    }
}
