
import { AbstractSWEIdentifiable, EncodedValues } from './basicTypes';
import { AbstractDataComponent } from './simpleComponents';
import { SweEncoding } from './simpleEncodings';

/**
 * Defines the structure of the element that will be repeated in the stream
 */
export class SweDataStream extends AbstractSWEIdentifiable {
  /**
   * Number of elements of the defined type that the stream contains
   */
  elementCount: number;
  /**
   * Definition and structure of one stream element
   */
  elementType: AbstractDataComponent;
  /**
   * Method used to encode the stream values
   */
  encoding: SweEncoding;
  /**
   * Encoded values for the stream (can be out of band)
   */
  values: EncodedValues;
}

/**
 * Implementation of ISO-11404 Array datatype. This defines an array of
 * identical data components with a elementCount. Values are given as a block
 * and can be encoded in different ways
 */
export class SweDataArray extends AbstractDataComponent {
  /**
   * Specifies the size of the array (i.e. the number of elements of the defined
   * type it contains)
   */
  elementCount: number;
  /**
   * Defines the structure of the element that will be repeated in the array
   */
  elementType: SweElementType;
  /**
   * Specifies the type of method used to encode the array values
   */
  encoding: SweEncoding;
  /**
   * If present, contains an encoded block of the values contained in the array.
   * Values are optional so that the array definition can be used a as a schema
   * for values provided externally
   */
  values: any;
}

export class SweElementType {
  name: string;
  type: AbstractDataComponent;
}

export type SweBlockComponent = SweDataArray;
