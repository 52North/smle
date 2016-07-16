import {AbstractSimpleComponent} from './AbstractSimpleComponent';
import {DisplayName} from '../../decorators/DisplayName';

export class AbstractSweRange extends AbstractSimpleComponent {
    @DisplayName('Value')
    value: [any, any];

    toString(fallbackLabel = 'Abstract SWE range') {
        return super.toString(fallbackLabel);
    }
}
