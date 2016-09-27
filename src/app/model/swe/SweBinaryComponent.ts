import { AbstractSWE } from './AbstractSWE';
import { DisplayName } from '../../decorators/DisplayName';

/**
 * Binary encoding parameters used for encoding a single data component.
 */
export class SweBinaryComponent extends AbstractSWE {
    /**
     * Name of the encryption method used  to encrypt the value of this field
     */
    @DisplayName('Encryption')
    encryption: string;
    /**
     * Number of significant bits actually used for a binary encoded numerical
     * value (all remaining bits shall be set to 0)
     */
    @DisplayName('Significant bits')
    significantBits: number;

    @DisplayName('Bit length')
    bitLength: number;
    /**
     * Byte length of this field when a custom data type is used
     */
    @DisplayName('Byte length')
    byteLength: number;

    /**
     * Binary data type used to encode the value(s) of the referenced data
     * component
     */
    @DisplayName('Data type')
    dataType: string;

    /**
     * Reference to the data component that these binary encoding settings apply
     * to
     */
    @DisplayName('Ref')
    ref: string;

    toString() {
        return 'SWE binary component';
    }
}
