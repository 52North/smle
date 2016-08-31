import { AbstractSimpleComponent } from './AbstractSimpleComponent';
import { AllowedValues } from './AllowedValues';
import { DisplayName } from '../../decorators/DisplayName';

/**
 * Scalar component with integer representation used for a discrete counting
 * value
 */
export class SweCount extends AbstractSimpleComponent {
  /**
   * Value is optional, to enable structure to act as a schema for values
   * provided using other encodings
   */
  @DisplayName('Value')
  value: number;

  @DisplayName('Constraint')
  constraint: AllowedValues = new AllowedValues();

  toString() {
    return 'Count Component';
  }
}
