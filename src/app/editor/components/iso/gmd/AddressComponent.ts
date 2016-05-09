
import { Component } from '@angular/core';
import { Address } from '../../../../model/iso/gmd/Address';
import { AbstractComponent } from '../../AbstractEditorComponent';
import { CardHeaderComponent } from '../../CardHeaderComponent';
import { StringsComponent } from '../../StringsComponent';

@Component({
  selector: 'iso-address',
  template: require('./AddressComponent.html'),
  directives: [CardHeaderComponent, StringsComponent]
})
export class AddressComponent extends AbstractComponent<Address> {
  protected createModel(): Address {
    return new Address();
  }
}
