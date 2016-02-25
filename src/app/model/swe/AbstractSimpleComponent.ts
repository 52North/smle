
import { AbstractDataComponent } from './AbstractDataComponent';
import { SweQuality } from './SweQuality';
import { AbstractAllowedValues } from './AbstractAllowedValues';
import { SweNilValue } from './SweNilValue';

export abstract class AbstractSimpleComponent extends AbstractDataComponent {
  /**
   * Frame of reference (usually temporal or spatial) with respect to which the
   * value of the component is expressed. A reference frame anchors a value to
   * a real world datum.
   */
  referenceFrame: string;
  /**
   * Specifies the reference axis (refer to gml:axisID). The reference frame
   * URI should also be specified unless it is inherited from parent Vector
   */
  axisId: string;
  quality: SweQuality[];
  value: any;
  constraint: AbstractAllowedValues;
  nilValues: SweNilValue[];
}
