import { SweDataArray } from './SweDataArray';

export class SweMatrix extends SweDataArray {
  referenceFrame: string;
  localFrame: string;

  toString() {
    return super.toString('SWE matrix');
  }
}
