
import { Component } from 'angular2/core';
import { Phone } from '../../../../model/iso/gmd/Phone';
import { AbstractComponent }  from '../../AbstractEditorComponent';
import { CardHeaderComponent } from '../../CardHeaderComponent';

@Component({
  selector: 'isoPhone',
  template: require('./PhoneComponent.html'),
  directives: [CardHeaderComponent]
})
export class PhoneComponent extends AbstractComponent<Phone> {

  protected createModel(): Phone {
    return new Phone();
  }
}
