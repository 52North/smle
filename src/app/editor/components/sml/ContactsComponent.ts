import { Component, Input } from '@angular/core';
import { AbstractArrayComponent } from '../AbstractArrayComponent';
import { CardHeaderComponent } from '../CardHeaderComponent';
import { ContactList } from '../../../model/sml';
import { ContactListComponent } from './ContactListComponent';

@Component({
  selector: 'sml-contacts',
  template: require('./ContactsComponent.html'),
  directives: [CardHeaderComponent, ContactListComponent]
})
export class ContactsComponent extends AbstractArrayComponent<ContactList> {

  protected createModel() {
    return new Array<ContactList>();
  }

  protected createEntry() {
    return new ContactList();
  }

}
