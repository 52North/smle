
import { AbstractSweRange } from './AbstractSweRange';
import { TimePosition } from './TimePosition';
import { UnitOfMeasure } from './UnitOfMeasure';
import { AllowedTimes } from './AllowedTimes';

/**
 * Time value pair for specifying a time range (can be a decimal or ISO 8601)
 */
export class SweTimeRange extends AbstractSweRange {
  /**
   * Value is a pair of time values expressed in ISO-8601 or as decimal numbers
   * separated by a space. It is optional, to enable structure to act as a
   * schema for values provided using other encodings
   */
  value: [TimePosition, TimePosition];
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
}
