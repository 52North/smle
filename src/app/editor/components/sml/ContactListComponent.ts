import { Component } from '@angular/core';
import { AbstractComponent } from '../AbstractComponent';
import { CardHeaderComponent } from '../CardHeaderComponent';
import { ContactList } from '../../../model/sml';
import { ResponsibleParty } from '../../../model/iso';
import { ResponsiblePartyComponent } from '../iso/gmd/ResponsiblePartyComponent';

@Component({
  selector: 'sml-contact-list',
  template: require('./ContactListComponent.html'),
  directives: [CardHeaderComponent, ResponsiblePartyComponent]
})
export class ContactListComponent extends AbstractComponent<ContactList> {

  protected createModel() {
    return new ContactList();
  }

  public onRemove(index: number): void {
    this.model.contacts.splice(index, 1);
  }

  public onAdd() {
    this.model.contacts.push(new ResponsibleParty());
  }
  
}