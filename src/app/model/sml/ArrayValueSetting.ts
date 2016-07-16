import { AbstractSetting } from './AbstractSetting';
import { SweEncoding } from '../swe/SweEncoding';
import { EncodedValues } from '../swe/EncodedValues';

export class ArrayValueSetting extends AbstractSetting {
  encoding: SweEncoding;
  value: EncodedValues;

  toString() {
    return 'Array value setting';
  }
}
