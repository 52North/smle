import { AbstractSweRange } from './AbstractSweRange';
import { UnitOfMeasure } from './UnitOfMeasure';
import { AllowedValues } from './AllowedValues';

/**
 * Decimal pair for specifying a quantity range with a unit of measure
 */
export class SweQuantityRange extends AbstractSweRange {
  /**
   * Value is a pair of double numbers separated by a space. It is optional, to
   * enable structure to act as a schema for values provided using other
   * encodings
   */
  value: [number, number];
  /**
   * Unit of measure used to express the value of this data component
   */
  uom: UnitOfMeasure;
  constraint: AllowedValues;

  toString() {
    return super.toString('SWE quantity range');
  }
}
