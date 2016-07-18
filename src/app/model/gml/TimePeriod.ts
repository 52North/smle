import {AbstractTime} from './AbstractTime';
import {DisplayName} from '../../decorators/DisplayName';

/**
 * gml:TimePeriod acts as a one-dimensional geometric primitive that represents
 * an identifiable extent in time.
 */
export class TimePeriod extends AbstractTime {
    @DisplayName('Begin')
    begin: Date;

    @DisplayName('End')
    end: Date;

    toString() {
        if (this.begin && this.end) {
            return this.begin.toISOString() + ' - ' + this.end.toISOString();
        } else {
            return 'Time period';
        }
    }
}