import { SweBinaryComponent } from './SweBinaryComponent';
import { SweBinaryBlock } from './SweBinaryBlock';
import { SweByteOrder } from './SweByteOrder';
import { SweByteEncoding } from './SweByteEncoding';
import { SweEncoding } from './SweEncoding';

/**
 * Parameters of the binary encoding method
 */
export class SweBinaryEncoding extends SweEncoding {
  members: Array<SweBinaryBlock | SweBinaryComponent>;
  /**
   * Byte order convention used to encode this binary data (big endian = most
   * significant byte first, MSB or little endian = least significant byte
   * first, LSB)
   */
  byteOrder: SweByteOrder;
  /**
   * Byte encoding method used to encode the binary data (raw or base 64)
   */
  byteEncoding: SweByteEncoding;
  /**
   * Total length in bytes of the binary stream (if known in advance)
   */
  byteLength: number;

  toString() {
    return 'SWE binary encoding';
  }
}
