import { SweBinaryComponent } from './SweBinaryComponent';
import { SweBinaryBlock } from './SweBinaryBlock';
import { SweByteOrder } from './SweByteOrder';
import { SweByteEncoding } from './SweByteEncoding';
import { SweEncoding } from './SweEncoding';
import { DisplayName } from '../../common/decorators/DisplayName';

/**
 * Parameters of the binary encoding method
 */
export class SweBinaryEncoding extends SweEncoding {
    @DisplayName('Members')
    members: Array<SweBinaryBlock | SweBinaryComponent> = [];
    /**
     * Byte order convention used to encode this binary data (big endian = most
     * significant byte first, MSB or little endian = least significant byte
     * first, LSB)
     */
    @DisplayName('Byte order')
    byteOrder: SweByteOrder;
    /**
     * Byte encoding method used to encode the binary data (raw or base 64)
     */
    @DisplayName('Byte encoding')
    byteEncoding: SweByteEncoding;
    /**
     * Total length in bytes of the binary stream (if known in advance)
     */
    @DisplayName('Byte length')
    byteLength: number;

    toString() {
        return 'SWE binary encoding';
    }
}
