
import { Input, Component, Output, EventEmitter } from 'angular2/core';
import { Contact } from '../../../../model/iso/gmd/Contact';
import { EditorComponent }  from '../../EditorComponent';

@Component({
  selector: 'contact',
  template: require('./ContactComponent.html')
})
export class ContactComponent implements EditorComponent<Contact> {
  @Input()
  public element = new Contact();
  public elementChange: EventEmitter<Contact> = new EventEmitter();
}
