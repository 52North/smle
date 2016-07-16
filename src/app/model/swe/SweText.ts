import { AbstractSimpleComponent } from './AbstractSimpleComponent';
import { AllowedTokens } from './AllowedTokens';

/**
 * Free text component used to store comments or any other type of textual
 * statement
 */
export class SweText extends AbstractSimpleComponent {
  /**
   * Value is optional, to enable structure to act as a schema for values
   * provided using other encodings
   */
  value: string;
  constraint: AllowedTokens;

  toString() {
    return super.toString('SWE text');
  }
}
