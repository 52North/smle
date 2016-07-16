import {AbstractDataComponent} from './AbstractDataComponent';
import {DisplayName} from '../../decorators/DisplayName';

export class SweField {
    @DisplayName('Name')
    name: string;

    @DisplayName('Component')
    component: AbstractDataComponent;

    toString() {
        return this.name || 'SWE field';
    }
}
