import { AbstractSWE } from '../swe/AbstractSWE';
import { Input } from './Input';

export class InputList extends AbstractSWE {
  inputs: Input[] = [];

  toString() {
    return 'Input list';
  }
}
