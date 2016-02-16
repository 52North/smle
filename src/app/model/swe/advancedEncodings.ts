
import { AbstractSWE } from './basicTypes';
import { AbstractEncoding } from './simpleEncodings';

/**
 * Binary encoding parameters used to encode a block of values at once. This is
 * used for encrypting or compressing a complete array of values for instance
 */
export class SweBlock extends AbstractSWE {
  /**
   * Name of the compression method used to encrypt the block of values
   * described by the referenced data component
   */
  compression: string;
  /**
   * Name of the encryption method used to encrypt the block of values described
   * by the referenced data component
   */
  encryption: string;
  /**
   * Number of padding bytes present in the stream after this binary block
   */
  paddingBytesAfter: number;
  /**
   * Number of padding bytes present in the stream before this binary block
   */
  paddingBytesBefore: number;
  /**
   * Length in byte of this binary block (if known in advance)
   */
  byteLength: number;
  /**
   * Reference to the aggregate data component that this binary block encoding
   * settings apply to
   */
  ref: string;
}

/**
 * Binary encoding parameters used for encoding a single data component.
 */
export class SweComponent extends AbstractSWE {
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

/**
 * Parameters of the binary encoding method
 */
export class BinaryEncoding extends AbstractEncoding {
  members: Array<SweBlock | SweComponent>;
  /**
   * Byte order convention used to encode this binary data (big endian = most
   * significant byte first, MSB or little endian = least significant byte
   * first, LSB)
   */
  byteOrder: ByteOrder;
  /**
   * Byte encoding method used to encode the binary data (raw or base 64)
   */
  byteEncoding: ByteEncoding;
  /**
   * Total length in bytes of the binary stream (if known in advance)
   */
  byteLength: number;
}

export const enum ByteEncoding {
  base64,
  raw
}

export const enum ByteOrder {
  bigEndian,
  littleEndian
}
