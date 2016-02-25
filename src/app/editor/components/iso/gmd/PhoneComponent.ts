
import { Component, Input} from 'angular2/core';
import { Control } from 'angular2/common';
import { Phone } from '../../../../model/iso/gmd/Phone';
import { EditorComponent }  from '../../EditorComponent';

@Component({
  selector: 'phone',
  template: require('./PhoneComponent.html')
})
export class PhoneComponent implements EditorComponent<Phone> {
  @Input()
  public element: Phone;
}
