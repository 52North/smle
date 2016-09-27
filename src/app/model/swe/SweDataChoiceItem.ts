import { AbstractDataComponent } from './AbstractDataComponent';
import { DisplayName } from '../../decorators/DisplayName';

export class SweDataChoiceItem {
    @DisplayName('Name')
    name: string;

    @DisplayName('Item')
    item: AbstractDataComponent;

    toString() {
        return this.name || 'SWE data choice item';
    }
}
