import { Component } from 'angular2/core';
import { ResponsibleParty } from '../../../../model/iso/gmd/ResponsibleParty';
import { AbstractComponent } from '../../AbstractEditorComponent';
import { CardHeaderComponent } from '../../CardHeaderComponent';
import { ContactComponent } from './ContactComponent';

@Component({
  selector: 'iso-responsible-party',
  template: require('./ResponsiblePartyComponent.html'),
  directives: [CardHeaderComponent, ContactComponent]
})
export class ResponsiblePartyComponent extends AbstractComponent<ResponsibleParty> {
  protected createModel(): ResponsibleParty {
    return new ResponsibleParty();
  }
}
