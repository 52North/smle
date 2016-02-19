
import { AbstractSWE } from './AbstractSWE';
import { SweBinaryBlock } from './SweBinaryBlock';
import { SweEncoding } from './SweEncoding';



/**
 * Binary encoding parameters used for encoding a single data component.
 */
export class SweBinaryComponent extends AbstractSWE {
  /**
   * Name of the encryption method used  to encrypt the value of this field
   */
  encryption: string;
  /**
   * Number of significant bits actually used for a binary encoded numerical
   * value (all remaining bits shall be set to 0)
   */
  significantBits: number;

  bitLength: number;
  /**
   * Byte length of this field when a custom data type is used
   */
  byteLength: number;

  /**
   * Binary data type used to encode the value(s) of the referenced data
   * component
   */
  dataType: string;

  /**
   * Reference to the data component that these binary encoding settings apply
   * to
   */
  ref: string;
}
