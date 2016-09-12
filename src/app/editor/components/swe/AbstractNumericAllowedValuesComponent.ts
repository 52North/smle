import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { AbstractNumericAllowedValues } from '../../../model/swe/AbstractNumericAllowedValues';
import { AbstractAllowedValuesComponent } from './AbstractAllowedValuesComponent';

@Component({
  selector: 'swe-abstract-numeric-allowed-values',
  template: require('./AbstractNumericAllowedValuesComponent.html')
})
export class AbstractNumericAllowedValuesComponent extends TypedModelComponent<AbstractNumericAllowedValues> {
  protected createModel(): AbstractNumericAllowedValues {
    return undefined;
  }
}
