import { SweDataArray } from './SweDataArray';
import { DisplayName } from '../../decorators/DisplayName';

export class SweMatrix extends SweDataArray {
    @DisplayName('Reference frame')
    referenceFrame: string;

    @DisplayName('Local frame')
    localFrame: string;

    toString() {
        return super.toString('SWE matrix');
    }
}
