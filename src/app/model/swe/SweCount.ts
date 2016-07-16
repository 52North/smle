import { AbstractSimpleComponent } from './AbstractSimpleComponent';
import { AllowedValues } from './AllowedValues';

/**
 * Scalar component with integer representation used for a discrete counting
 * value
 */
export class SweCount extends AbstractSimpleComponent {
  /**
   * Value is optional, to enable structure to act as a schema for values
   * provided using other encodings
   */
  value: number;
  constraint: AllowedValues;

  toString() {
    return super.toString('SWE count');
  }
}
