import { AbstractNumericAllowedValues } from './AbstractNumericAllowedValues';
import { TimePosition } from './TimePosition';
import { DisplayName } from '../../decorators/DisplayName';

/**
 * Defines the permitted values for the component, as a time range or an
 * enumerated list of time values
 */
export class AllowedTimes extends AbstractNumericAllowedValues {
    @DisplayName('Values')
    values: Array<TimePosition | [TimePosition, TimePosition]> = [];

    toString() {
        return 'Allowed times';
    }
}
