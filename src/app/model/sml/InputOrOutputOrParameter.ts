import {SweDataComponent} from '../swe/SweDataComponent';
import {ObservableProperty} from './ObservableProperty';
import {DataInterface} from './DataInterface';

export class InputOrOutputOrParameter {
    name: string;
    value: SweDataComponent | ObservableProperty | DataInterface;

    toString() {
        return this.name || 'Input or output or parameter';
    }
}
