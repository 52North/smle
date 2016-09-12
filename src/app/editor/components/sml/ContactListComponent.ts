import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ContactList } from '../../../model/sml';
import { ResponsibleParty } from '../../../model/iso';
import { ResponsiblePartyComponent } from '../iso/gmd/ResponsiblePartyComponent';
import { CardComponent } from '../basic/CardComponent';
import { ListComponent } from '../basic/ListComponent';
import { EditorComponent } from '../base/EditorComponent';
import { ChildMetadata } from '../base/TypedModelComponent';

@Component({
  selector: 'sml-contact-list',
  template: require('./ContactListComponent.html'),
  styles: [require('../styles/editor-component.scss')]
})
export class ContactListComponent extends EditorComponent<ContactList> {
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef
  ) {
    super(componentFactoryResolver, viewContainerRef);
  }

  protected createModel() {
    return new ContactList();
  }

  public onRemove(index: number): void {
    this.closeChildWithModel(this.model.contacts[index]);
    this.model.contacts.splice(index, 1);
  }

  public onAdd() {
    this.model.contacts.push(new ResponsibleParty());
  }

  private openNewResponsiblePartyItem(item: ResponsibleParty) {
    var metadata = new ChildMetadata(ResponsiblePartyComponent, item, this.config.getConfigFor('contacts'));
    this.openNewChild(metadata);
  }
}
