import { AbstractSWE } from './AbstractSWE';
import { DisplayName } from '../../common/decorators/DisplayName';

/**
 * Binary encoding parameters used to encode a block of values at once. This is
 * used for encrypting or compressing a complete array of values for instance
 */
export class SweBinaryBlock extends AbstractSWE {
    /**
     * Name of the compression method used to encrypt the block of values
     * described by the referenced data component
     */
    @DisplayName('Compression')
    compression: string;
    /**
     * Name of the encryption method used to encrypt the block of values described
     * by the referenced data component
     */
    @DisplayName('Encryption')
    encryption: string;
    /**
     * Number of padding bytes present in the stream after this binary block
     */
    @DisplayName('Padding bytes after')
    paddingBytesAfter: number;
    /**
     * Number of padding bytes present in the stream before this binary block
     */
    @DisplayName('Padding bytes before')
    paddingBytesBefore: number;
    /**
     * Length in byte of this binary block (if known in advance)
     */
    @DisplayName('Byte length')
    byteLength: number;
    /**
     * Reference to the aggregate data component that this binary block encoding
     * settings apply to
     */
    @DisplayName('Ref')
    ref: string;

    toString() {
        return 'SWE binary block';
    }
}
