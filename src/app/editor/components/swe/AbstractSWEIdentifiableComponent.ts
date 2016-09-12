import { Component } from '@angular/core';
import { AbstractSWEIdentifiable } from '../../../model/swe/AbstractSWEIdentifiable';
import { AbstractSWEComponent } from './AbstractSWEComponent';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { TextFieldComponent } from '../basic/TextFieldComponent';

@Component({
  selector: 'swe-abstract-identifiable',
  template: require('./AbstractSWEIdentifiableComponent.html')
})
export class AbstractSWEIdentifiableComponent extends TypedModelComponent<AbstractSWEIdentifiable> {
  protected createModel(): AbstractSWEIdentifiable {
    return undefined;
  }
}
