import { SweDataComponent } from '../swe/SweDataComponent';
import { ObservableProperty } from './ObservableProperty';
import { DataInterface } from './DataInterface';
import { DisplayName } from '../../decorators/DisplayName';

export class InputOrOutputOrParameter {
    @DisplayName('Name')
    name: string;

    @DisplayName('Value')
    value: SweDataComponent | ObservableProperty | DataInterface;

    toString() {
        return this.name || 'Input or output or parameter';
    }
}
