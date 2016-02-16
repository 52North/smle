import {CodeWithAuthority} from '../gml';
import {AbstractSWE, AbstractSWEIdentifiable, TimePosition} from './basicTypes';


/**
 * Abstract base class for all data components
 */
export abstract class AbstractDataComponent extends AbstractSWEIdentifiable {
  /**
   * Reference to semantic information defining the precise nature of the
   * component
   */
  definition: string;
  /**
   * Specifies that data for this component can be omitted in the datastream
   */
  optional: boolean = false;
  /**
   * Specifies if the value of a data component can be updated externally
   * (i.e. is variable)
   */
  updatable: boolean;
}

class AbstractAllowedValues extends AbstractSWE {
  values: any[];
}

class AbstractNumericAllowedValues extends AbstractAllowedValues {
  significantFigures: number;
}

/**
 * Defines the permitted values for the component as an enumerated list and/or
 * a list of inclusive ranges
 */
export class AllowedValues extends AbstractNumericAllowedValues {
  values: number[] | [number, number][];
}

/**
 * Defines permitted values for the component, as an enumerated list of tokens
 * or a regular expression pattern
 */
export class AllowedTokens extends AbstractAllowedValues {
  values: string[];
  pattern: string;
}

/**
 * Defines the permitted values for the component, as a time range or an
 * enumerated list of time values
 */
export class AllowedTimes extends AbstractNumericAllowedValues {
  values: TimePosition[] | [TimePosition, TimePosition][];
}


export class AbstractSimpleComponent extends AbstractDataComponent {
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
}

class AbstractSweRange extends AbstractSimpleComponent {
  value: [any, any];
}

/**
 * Scalar component used to express truth: True or False, 0 or 1
 */
export class SweBoolean extends AbstractSimpleComponent {
  /**
   * Value is optional, to enable structure to act as a schema for values
   * provided using other encodings
   */
  value: boolean;
}

/**
 * Scalar component with decimal representation and a unit of measure used to
 * store value of a continuous quantity
 */
export class SweQuantity extends AbstractSimpleComponent {
  /**
   * Value is optional, to enable structure to act as a schema for values
   * provided using other encodings
   */
  value: number;
  /**
   * Unit of measure used to express the value of this data component
   */
  uom: string;
  constraint: AllowedValues;
}

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
  uom: string;
  constraint: AllowedValues;
}

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
}

/**
 * Integer pair used for specifying a count range
 */
export class SweCountRange extends AbstractSweRange {
  /**
   * Value is a pair of integer numbers separated by a space. It is optional, to
   * enable structure to act as a schema for values provided using other
   * encodings
   */
  value: [number, number];
  constraint: AllowedValues;
}

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
  uom: string;
  constraint: AllowedTimes;
}

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
  uom: string;
  constraint: AllowedTimes;
}

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
}

/**
 * Scalar component used to represent a categorical value as a simple token
 * identifying a term in a code space
 */
export class SweCategory extends AbstractSimpleComponent {
  /**
   * Value is optional, to enable structure to act as a schema for values
   * provided using other encodings
   */
  value: string;
  /**
   * Name of the dictionary where the possible values for this component are
   * listed and defined
   */
  codeSpace: string;
  constraint: AllowedTokens;
}

/**
 * Pair of categorical values used to specify a range in an ordinal
 * reference system (specified by the code space)
 */
export class SweCategoryRange extends AbstractSweRange {
  /**
   * Value is a pair of tokens separated by a space (if tokens contain spaces,
   * they must be espaced by using XML entities). It is optional, to enable
   * structure to act as a schema for values provided using other encodings
   */
  value: [string, string];
  /**
   * Name of the dictionary defining an ordered set of values with respect to
   * which the range is expressed (ordinal reference system)
   */
  codeSpace: string;
  constraint: AllowedTokens;
}

/**
 * Provides an indication of the reliability of the parent component value in
 * the form of a decimal number (ex: relative accuracy), a range (ex:
 * bidirectional tolerance), a categorical value (ex: good, bad) or plain
 * textual statement
 */
export type SweQuality = SweQuantity
  | SweQuantityRange
  | SweCategory
  | SweText;

/**
 * Re-usable group providing a choice of range data components
 */
export type SweAnyRange = SweQuantityRange
  | SweTimeRange
  | SweCountRange
  | SweCategoryRange;

/**
 * Re-usable group providing a choice of numeric data components
 */
export type SweAnyNumerical = SweCount
  | SweQuantity
  | SweTime;

/**
 * Re-usable group providing a choice of scalar data components
 */
export type SweAnyScalar = SweBoolean
  | SweCount
  | SweQuantity
  | SweTime
  | SweCategory
  | SweText;
