import {Component} from '@angular/core';
import {DescribedObject} from '../../../model/sml/DescribedObject';
import {AbstractFeatureComponent} from '../gml/AbstractFeatureComponent';
import {KeywordList} from '../../../model/sml/KeywordList';
import {IdentifierList} from '../../../model/sml/IdentifierList';
import {ClassifierList} from '../../../model/sml/ClassifierList';
import {DocumentList} from '../../../model/sml/DocumentList';
import {KeywordListComponent} from '../swe/KeywordListComponent';
import {IdentifierListComponent} from './IdentifierListComponent';
import {ClassifierListComponent} from './ClassifierListComponent';
import {DocumentListComponent} from './DocumentListComponent';
import {ListComponent} from '../basic/ListComponent';
import {ContactListComponent} from './ContactListComponent';
import {ContactList} from '../../../model/sml/ContactList';
import {EventList} from '../../../model/sml/EventList';
import {EventListComponent} from './EventListComponent';
import {TimeListComponent} from '../basic/TimeListComponent';
import {PositionListComponent} from '../basic/PositionListComponent';
import {ChildMetadata, TypedModelComponent} from '../base/TypedModelComponent';

@Component({
  selector: 'sml-described-object',
  template: require('./DescribedObjectComponent.html'),
  directives: [AbstractFeatureComponent, KeywordListComponent, IdentifierListComponent,
    ClassifierListComponent, ContactListComponent, ListComponent, TimeListComponent, PositionListComponent]
})
export class DescribedObjectComponent extends TypedModelComponent<DescribedObject> {
  protected createModel(): DescribedObject {
    return undefined;
  }

  private openNewKeywordListItem(item: KeywordList) {
    var metadata = new ChildMetadata(KeywordListComponent, item, this.config.getConfigFor('keywords'));
    this.openNewChild(metadata);
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

  private openNewEventListItem(item: EventList) {
    var metadata = new ChildMetadata(EventListComponent, item, this.config.getConfigFor('history'));
    this.openNewChild(metadata);
  }

  private openNewDocumentListItem(item: DocumentList) {
    var metadata = new ChildMetadata(DocumentListComponent, item, this.config.getConfigFor('documentation'));
    this.openNewChild(metadata);
  }

  private onAddKeywordList() {
    this.model.keywords.push(new KeywordList());
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

  private onAddEventList() {
    this.model.history.push(new EventList());
  }

  private onAddDocumentList() {
    this.model.documentation.push(new DocumentList());
  }

  private onRemoveKeywordList(index: number) {
    this.model.keywords.splice(index, 1);
  }

  private onRemoveClassifierList(index: number) {
    this.model.classification.splice(index, 1);
  }

  private onRemoveIdentifierList(index: number) {
    this.model.identification.splice(index, 1);
  }

  private onRemoveContactList(index: number) {
    this.model.contacts.splice(index, 1);
  }

  private onRemoveEventList(index: number) {
    this.model.history.splice(index, 1);
  }

  private onRemoveDocumentList(index: number) {
    this.model.documentation.splice(index, 1);
  }
}
