import { AbstractNumericAllowedValues } from './AbstractNumericAllowedValues';
import { TimePosition } from './TimePosition';

/**
 * Defines the permitted values for the component, as a time range or an
 * enumerated list of time values
 */
export class AllowedTimes extends AbstractNumericAllowedValues {
  values: Array<TimePosition | [TimePosition, TimePosition]> = [];
}
