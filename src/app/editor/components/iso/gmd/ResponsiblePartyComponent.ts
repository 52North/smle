import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ResponsibleParty } from '../../../../model/iso/gmd/ResponsibleParty';
import { Contact } from '../../../../model/iso/gmd/Contact';
import { CardComponent } from '../../basic/CardComponent';
import { ContactComponent } from './ContactComponent';
import { EditorComponent } from '../../base/EditorComponent';
import { ChildMetadata } from '../../base/TypedModelComponent';
import { TextFieldComponent } from '../../basic/TextFieldComponent';
import { ChildItemComponent } from '../../basic/ChildItemComponent';

@Component({
  selector: 'iso-responsible-party',
  template: require('./ResponsiblePartyComponent.html'),
  styles: [require('../../styles/editor-component.scss')]
})
export class ResponsiblePartyComponent extends EditorComponent<ResponsibleParty> {
  constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
    super(componentFactoryResolver, viewContainerRef);
  }

  protected createModel(): ResponsibleParty {
    return new ResponsibleParty();
  }

  onAddContact() {
    this.model.contactInfo = new Contact();
  }

  onRemoveContact() {
    this.closeChildWithModel(this.model.contactInfo);
    this.model.contactInfo = null;
  }

  private openNewContactInfoItem(item: Contact) {
    var metadata = new ChildMetadata(ContactComponent, item, this.config.getConfigFor('contactInfo'));
    this.openNewChild(metadata);
  }
}
