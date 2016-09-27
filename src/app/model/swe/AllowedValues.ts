import { AbstractNumericAllowedValues } from './AbstractNumericAllowedValues';
import { DisplayName } from '../../decorators/DisplayName';

/**
 * Defines the permitted values for the component as an enumerated list and/or
 * a list of inclusive ranges
 */
export class AllowedValues extends AbstractNumericAllowedValues {
    @DisplayName('Values')
    values: Array<number | [number, number]> = [];

    toString() {
        return 'Allowed values';
    }
}
