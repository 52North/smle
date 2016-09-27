import { EncodedValues } from './EncodedValues';
import { AbstractDataComponent } from './AbstractDataComponent';
import { SweElementType } from './SweElementType';
import { SweEncoding } from './SweEncoding';
import { DisplayName } from '../../decorators/DisplayName';

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
    @DisplayName('Element count')
    elementCount: number;
    /**
     * Defines the structure of the element that will be repeated in the array
     */
    @DisplayName('Element type')
    elementType: SweElementType;
    /**
     * Specifies the type of method used to encode the array values
     */
    @DisplayName('Encoding')
    encoding: SweEncoding;
    /**
     * If present, contains an encoded block of the values contained in the array.
     * Values are optional so that the array definition can be used a as a schema
     * for values provided externally
     */
    @DisplayName('Values')
    values: EncodedValues;

    toString(fallbackLabel = 'Data Array Component') {
        return fallbackLabel;
    }

    getValue() {
        return this.toString();
    }
}
