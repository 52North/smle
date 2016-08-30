import { AbstractDataComponent } from './AbstractDataComponent';
import { SweField } from './SweField';
import { DisplayName } from '../../decorators/DisplayName';

/**
 * Implementation of ISO-11404 Record datatype. This allows grouping (sequence)
 * of data components which can themselves be simple types, records, arrays or
 * choices
 */
export class SweDataRecord extends AbstractDataComponent {
  /**
   * Definition of the field provided as a nested data component. The field can
   * be scalar or can itself be an aggregate such as a record, choice or array
   */
  @DisplayName('Fields')
  fields: SweField[] = [];

  toString() {
    return 'Data Record Component';
  }
}
