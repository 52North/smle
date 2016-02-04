
import {AbstractDataComponent} from './simpleComponents';

/**
 * Implementation of ISO-11404 Record datatype. This allows grouping (sequence) of data components which can themselves be simple types, records, arrays or choices
 */
export class SweDataRecord extends AbstractDataComponent {
  /**
   * Definition of the field provided as a nested data component. The field can be scalar or can itself be an aggregate such as a record, choice or array
   */
  fields: AbstractDataComponent[];
}

/**
 * Implementation of a mathematical vector composed of a list of scalar coordinates expressed in the mandatory reference frame.
 */
export class SweVector extends AbstractDataComponent {
  /**
   * Definition of the coordinate provided as a data component with a numerical representation
   */
  coordinates: AbstractDataComponent[];
  /**
   * Frame of reference (usually spatial) with respect to which the coordinates of this vector are expressed. A reference frame anchors a vector value to a real world datum.
   */
  referenceFrame: string;
  /**
   * Frame of reference whose origin is located by the coordinates of this vector
   */
  localFrame: string;
}
