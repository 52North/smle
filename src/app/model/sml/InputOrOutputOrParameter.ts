import { SweDataComponent } from '../swe/SweDataComponent';
import { ObservableProperty } from './ObservableProperty';
import { DataInterface } from './DataInterface';

export class InputOrOutputOrParameter {
  name: string;
  value: SweDataComponent | ObservableProperty | DataInterface;
}
