import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {CardComponent} from '../basic/CardComponent';
import {ListComponent} from '../basic/ListComponent';
import {AbstractSWEComponent} from '../swe/AbstractSWEComponent';
import {KeywordListComponent} from '../swe/KeywordListComponent';
import {IdentifierListComponent} from './IdentifierListComponent';
import {ClassifierListComponent} from './ClassifierListComponent';
import {ContactListComponent} from './ContactListComponent';
import {CodeTypeComponent} from '../gml/CodeTypeComponent';
import {AbstractSWEIdentifiableComponent} from '../swe/AbstractSWEIdentifiableComponent';
import {Event} from '../../../model/sml/Event';
import {EditorComponent} from '../base/EditorComponent';
import {IdentifierList} from '../../../model/sml/IdentifierList';
import {ClassifierList} from '../../../model/sml/ClassifierList';
import {ContactList} from '../../../model/sml/ContactList';
import {ChildMetadata} from '../base/TypedModelComponent';
import {CodeWithAuthority} from '../../../model/gml/CodeWithAuthority';

@Component({
  selector: 'sml-event',
  template: require('./EventComponent.html'),
  styles: [require('../styles/editor-component.scss')],
  directives: [CardComponent, AbstractSWEComponent, AbstractSWEIdentifiableComponent,
    KeywordListComponent, IdentifierListComponent, ListComponent, CodeTypeComponent]
})
export class EventComponent extends EditorComponent<Event> {
  constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
    super(componentResolver, viewContainerRef);
  }

  protected createModel(): Event {
    return new Event();
  }

  private createDefinition() {
    this.model.definition = new CodeWithAuthority('', '');
  }

  private resetDefinition() {
    this.model.definition = null;
  }

  private openNewIdentifierListItem(item: IdentifierList) {
    var metadata = new ChildMetadata(IdentifierListComponent, item, this.config.getConfigFor('identification'));
    this.openNewChild(metadata);
  }

  private openNewClassifierListItem(item: ClassifierList) {
    var metadata = new ChildMetadata(ClassifierListComponent, item, this.config.getConfigFor('classification'));
    this.openNewChild(metadata);
  }

  private openNewContactListItem(item: ContactList) {
    var metadata = new ChildMetadata(ContactListComponent, item, this.config.getConfigFor('contacts'));
    this.openNewChild(metadata);
  }

  private onAddIdentifierList() {
    this.model.identification.push(new IdentifierList());
  }

  private onAddClassifierList() {
    this.model.classification.push(new ClassifierList());
  }

  private onAddContactList() {
    this.model.contacts.push(new ContactList());
  }

  private onRemoveIdentifierList(index: number) {
    this.model.identification.splice(index, 1);
  }

  private onRemoveClassifierList(index: number) {
    this.model.classification.splice(index, 1);
  }

  private onRemoveContactList(index: number) {
    this.model.contacts.splice(index, 1);
  }

}
