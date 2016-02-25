import { Component, Input, ChangeDetectorRef } from 'angular2/core';
import { FormBuilder, ControlGroup } from 'angular2/common';
import { Address } from '../../../../model/iso/gmd/Address';
import { EditorComponent }  from '../../EditorComponent';

@Component({
  selector: 'address',
  template: require('./AddressComponent.html')
})
export class AddressComponent implements EditorComponent<Address> {
  @Input()
  public element: Address;
}
