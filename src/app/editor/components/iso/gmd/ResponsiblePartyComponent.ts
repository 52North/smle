
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ResponsibleParty } from '../../../../model/iso/gmd/ResponsibleParty';
import { Contact } from '../../../../model/iso/gmd/Contact';
import { AbstractComponent } from '../../AbstractComponent';
import { CardHeaderComponent } from '../../CardHeaderComponent';
import { ContactComponent } from './ContactComponent';

@Component({
  selector: 'iso-responsible-party',
  template: require('./ResponsiblePartyComponent.html'),
  directives: [CardHeaderComponent, ContactComponent]
})
export class ResponsiblePartyComponent extends AbstractComponent<ResponsibleParty>{

  protected createModel(): ResponsibleParty {
    return new ResponsibleParty();
  }


  onAddContact() {
    this.model.contactInfo = new Contact();
  }

  onRemoveContact() {
    this.model.contactInfo = null;
  }

}