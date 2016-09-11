import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DescribedObject } from '../../../model/sml/DescribedObject';
import { AbstractFeatureComponent } from '../gml/AbstractFeatureComponent';
import { KeywordList } from '../../../model/sml/KeywordList';
import { IdentifierList } from '../../../model/sml/IdentifierList';
import { ClassifierList } from '../../../model/sml/ClassifierList';
import { DocumentList } from '../../../model/sml/DocumentList';
import { KeywordListComponent } from '../swe/KeywordListComponent';
import { IdentifierListComponent } from './IdentifierListComponent';
import { ClassifierListComponent } from './ClassifierListComponent';
import { DocumentListComponent } from './DocumentListComponent';
import { ListComponent } from '../basic/ListComponent';
import { ContactListComponent } from './ContactListComponent';
import { ContactList } from '../../../model/sml/ContactList';
import { EventList } from '../../../model/sml/EventList';
import { EventListComponent } from './EventListComponent';
import { PositionListComponent } from '../basic/PositionListComponent';
import { ChildMetadata, TypedModelComponent } from '../base/TypedModelComponent';
import { CharacteristicList } from '../../../model/sml/CharacteristicList';
import { CharacteristicListComponent } from './CharacteristicListComponent';
import { CapabilityList } from '../../../model/sml/CapabilityList';
import { CapabilityListComponent } from './CapabilityListComponent';
import { AbstractTime } from '../../../model/gml/AbstractTime';
import { TimeInstant } from '../../../model/gml/TimeInstant';
import { TimePeriod } from '../../../model/gml/TimePeriod';
import { TimeInstantComponent } from '../gml/TimeInstantComponent';
import { TimePeriodComponent } from '../gml/TimePeriodComponent';

@Component({
  selector: 'sml-described-object',
  template: require('./DescribedObjectComponent.html')
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

  private openNewCharacteristicListItem(item: CharacteristicList) {
    var metadata = new ChildMetadata(CharacteristicListComponent, item,
      this.config.getConfigFor('characteristics'));
    this.openNewChild(metadata);
  }

  private openNewCapabilityListItem(item: CapabilityList) {
    var metadata = new ChildMetadata(CapabilityListComponent, item, this.config.getConfigFor('capabilities'));
    this.openNewChild(metadata);
  }

  private openNewAbstractTimeItem(item: AbstractTime) {
    var metadata: ChildMetadata;
    if (item instanceof TimeInstant) {
      metadata = new ChildMetadata(TimeInstantComponent, item,
        this.config.getConfigFor('validTime').getConfigFor('timeInstant'));
    } else if (item instanceof TimePeriod) {
      metadata = new ChildMetadata(TimePeriodComponent, item,
        this.config.getConfigFor('validTime').getConfigFor('timePeriod'));
    }

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

  private onAddCharacteristicList() {
    this.model.characteristics.push(new CharacteristicList());
  }

  private onAddCapabilityList() {
    this.model.capabilities.push(new CapabilityList());
  }

  private onAddTimeInstant() {
    var instant = new TimeInstant();
    instant.time = new Date();

    this.model.validTime.push(instant);
  }

  private onAddTimePeriod() {
    var period = new TimePeriod();
    period.begin = new Date();
    period.end = new Date();

    this.model.validTime.push(period);
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

  private onRemoveCharacteristicList(index: number) {
    this.model.characteristics.splice(index, 1);
  }

  private onRemoveCapabilityList(index: number) {
    this.model.capabilities.splice(index, 1);
  }

  private onRemoveAbstractTime(index: number) {
    this.model.validTime.splice(index, 1);
  }

  private getAbstractTimeTitle(item: AbstractTime) {
    var datePipe = new DatePipe();

    if (item instanceof TimeInstant) {
      return `Time: ${datePipe.transform(item.time)}`;
    }

    if (item instanceof TimePeriod) {
      return `Period: ${datePipe.transform(item.begin)} - ${datePipe.transform(item.end)}`;
    }

    return '';
  }
}
