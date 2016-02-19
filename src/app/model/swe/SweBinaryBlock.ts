import { AbstractSWE } from './AbstractSWE';

/**
 * Binary encoding parameters used to encode a block of values at once. This is
 * used for encrypting or compressing a complete array of values for instance
 */
export class SweBinaryBlock extends AbstractSWE {
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
