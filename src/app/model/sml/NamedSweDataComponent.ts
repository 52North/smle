import { AbstractDataComponent } from '../swe';
import { DisplayName } from '../../decorators/DisplayName';

export class NamedSweDataComponent {
    @DisplayName('Name')
    name: string = '';

    @DisplayName('Component')
    component: AbstractDataComponent;

    toString() {
        return this.name || this.component.toString();
    }
}
