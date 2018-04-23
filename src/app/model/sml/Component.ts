import { DisplayName } from '../../common/decorators/DisplayName';
import { AbstractProcess } from '../sml';

export class Component {
    @DisplayName('Name')
    name: string;

    abstractProcess: AbstractProcess;

    toString() {
        return this.name || 'Component';
    }
}
