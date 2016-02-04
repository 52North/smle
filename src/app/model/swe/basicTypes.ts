
import {CodeWithAuthority} from '../gml';

export type TimePosition = TimeIndeterminateValue | Date | number;

export enum TimeIndeterminateValue {
  /**
   * "now" indicates that the specified value shall be replaced with the current temporal position whenever the value is accessed.
   */
  now
}

/**
 * Base substitution groups for all SWE Common objects other than value objects
 */
export abstract class AbstractSWE {
  /**
   * Extension slot for future extensions to this standard.
   */
  extension: any[];
}

/**
 * Base substitution groups for all SWE Common objects with identification metadata
 */
export abstract class AbstractSWEIdentifiable extends AbstractSWE {
  /**
   * Unique identifier of the data component. It can be used to globally identify a particular component of the dataset, a process input/output or a universal constant
   */
  identifier: CodeWithAuthority;
  /**
   * Textual label for the data component . This is often used for displaying a human readable name for a dataset field or a process input/output
   */
  label: string;
  /**
   * Textual description (i.e. human readable) of the data component usually used to clarify its nature
   */
  description: string;
}


export class EncodedValues {
}
