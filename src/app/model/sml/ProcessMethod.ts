import {AbstractSWEIdentifiable} from '../swe/AbstractSWEIdentifiable';
import {AbstractAlgorithm} from './AbstractAlgorithm';
import {DisplayName} from '../../decorators/DisplayName';

export class ProcessMethod extends AbstractSWEIdentifiable {
    @DisplayName('Algorithm')
    algorithm: AbstractAlgorithm[] = [];

    toString() {
        return super.toString('Process method');
    }
}
