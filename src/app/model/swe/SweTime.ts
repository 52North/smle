import { AbstractSimpleComponent } from './AbstractSimpleComponent';
import { TimePosition } from './TimePosition';
import { UnitOfMeasure } from './UnitOfMeasure';
import { AllowedTimes } from './AllowedTimes';

/**
 * Scalar component used to represent a time quantity either as ISO 8601
 * (e.g. 2004-04-18T12:03:04.6Z) or as a duration relative to a time of
 * reference
 */
export class SweTime extends AbstractSimpleComponent {
  /**
   * Value is optional, to enable structure to act as a schema for values
   * provided using other encodings
   */
  value: TimePosition;
  /**
   * Specifies the origin of the temporal reference frame as an ISO8601 date
   * (used to specify time after an epoch that is to say in a custom frame)
   */
  referenceTime: Date;
  /**
   * Temporal frame of reference whose origin is located by the value of this
   * component
   */
  localFrame: string;
  /**
   * Temporal unit of measure used to express the value of this data component
   */
  uom: UnitOfMeasure;
  constraint: AllowedTimes;

  toString() {
    return super.toString('SWE time');
  }
}
