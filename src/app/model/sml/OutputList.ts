import { AbstractSWE } from '../swe/AbstractSWE';
import { Output } from './Output';

export class OutputList extends AbstractSWE {
  outputs: Output[] = [];

  toString() {
    return 'Output list';
  }
}
