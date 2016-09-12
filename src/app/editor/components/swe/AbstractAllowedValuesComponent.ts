import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { AbstractAllowedValues } from '../../../model/swe/AbstractAllowedValues';
import { AbstractSWEComponent } from './AbstractSWEComponent';

@Component({
  selector: 'swe-abstract-allowed-values',
  template: require('./AbstractAllowedValuesComponent.html')
})
export class AbstractAllowedValuesComponent extends TypedModelComponent<AbstractAllowedValues> {
  protected createModel(): AbstractAllowedValues {
    return undefined;
  }
}
