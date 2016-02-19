import { AbstractNumericAllowedValues } from './AbstractNumericAllowedValues';

/**
 * Defines the permitted values for the component as an enumerated list and/or
 * a list of inclusive ranges
 */
export class AllowedValues extends AbstractNumericAllowedValues {
  values: Array<number | [number, number]> = [];
}
