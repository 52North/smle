import {AbstractSetting} from './AbstractSetting';
import {SweEncoding} from '../swe/SweEncoding';
import {EncodedValues} from '../swe/EncodedValues';
import {DisplayName} from '../../decorators/DisplayName';

export class ArrayValueSetting extends AbstractSetting {
    @DisplayName('Encoding')
    encoding: SweEncoding;

    @DisplayName('Encoded values')
    value: EncodedValues;

    toString() {
        return 'Array value setting';
    }
}
