import {DescribedObject} from './DescribedObject';
import {Settings} from './Settings';
import {DisplayName} from '../../decorators/DisplayName';

export class Mode extends DescribedObject {
    @DisplayName('Configuration')
    configuration: Settings = null;

    toString() {
        return 'Mode';
    }
}
