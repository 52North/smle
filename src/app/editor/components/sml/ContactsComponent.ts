import { Component, Input } from '@angular/core';
import { AbstractArrayComponent } from '../AbstractArrayComponent';
import { CardHeaderComponent } from '../CardHeaderComponent';
import { ContactList } from '../../../model/sml';
import { ResponsibleParty } from '../../../model/iso';
import { ContactListComponent } from './ContactListComponent';

@Component({
  selector: 'sml-contacts',
  template: require('./ContactsComponent.html'),
  directives: [CardHeaderComponent, ContactListComponent]
})
export class ContactsComponent extends AbstractArrayComponent<ContactList> {
  
  protected createModel() {
    return new ContactList()[0];
  }
  
  public onAdd() {
    this.model.push(new ContactList());
  }
  
  public onRemove(index: number) {
    this.model.splice(index, 1);
  }
}