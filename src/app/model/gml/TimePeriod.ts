import { AbstractTime } from './AbstractTime';
import { DisplayName } from '../../common/decorators/DisplayName';

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
        return 'Time period';
    }

    getLabel() {
        return this.toString();
    }

    getValue() {
        if (this.begin && this.end) {
            return this.begin.toLocaleString().replace(/ /g, '\xa0') + ' - '
                + this.end.toLocaleString().replace(/ /g, '\xa0');
        }
        return this.toString();
    }
}
