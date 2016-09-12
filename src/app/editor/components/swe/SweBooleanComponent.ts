import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { AbstractSimpleComponentComponent } from './AbstractSimpleComponentComponent';
import { CheckboxComponent } from '../basic/CheckboxComponent';
import { SweBoolean } from '../../../model/swe/SweBoolean';

@Component({
  selector: 'swe-boolean',
  template: require('./SweBooleanComponent.html')
})
export class SweBooleanComponent extends TypedModelComponent<SweBoolean> {
  protected createModel(): SweBoolean {
    return new SweBoolean();
  }
}
