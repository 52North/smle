import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DescribedObject } from '../../../model/sml/DescribedObject';
import { KeywordList } from '../../../model/sml/KeywordList';
import { IdentifierList } from '../../../model/sml/IdentifierList';
import { ClassifierList } from '../../../model/sml/ClassifierList';
import { DocumentList } from '../../../model/sml/DocumentList';
import { KeywordListComponent } from '../swe/KeywordListComponent';
import { IdentifierListComponent } from './IdentifierListComponent';
import { ClassifierListComponent } from './ClassifierListComponent';
import { DocumentListComponent } from './DocumentListComponent';
import { ContactListComponent } from './ContactListComponent';
import { ContactList } from '../../../model/sml/ContactList';
import { EventList } from '../../../model/sml/EventList';
import { EventListComponent } from './EventListComponent';
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

    protected openNewKeywordListItem(item: KeywordList) {
        let metadata = new ChildMetadata(KeywordListComponent, item, this.config.getConfigFor('keywords'));
        this.openNewChild(metadata);
    }

    protected openNewIdentifierListItem(item: IdentifierList) {
        let metadata = new ChildMetadata(IdentifierListComponent, item, this.config.getConfigFor('identification'));
        this.openNewChild(metadata);
    }

    protected openNewClassifierListItem(item: ClassifierList) {
        let metadata = new ChildMetadata(ClassifierListComponent, item, this.config.getConfigFor('classification'));
        this.openNewChild(metadata);
    }

    protected openNewContactListItem(item: ContactList) {
        let metadata = new ChildMetadata(ContactListComponent, item, this.config.getConfigFor('contacts'));
        this.openNewChild(metadata);
    }

    protected openNewEventListItem(item: EventList) {
        let metadata = new ChildMetadata(EventListComponent, item, this.config.getConfigFor('history'));
        this.openNewChild(metadata);
    }

    protected openNewDocumentListItem(item: DocumentList) {
        let metadata = new ChildMetadata(DocumentListComponent, item, this.config.getConfigFor('documentation'));
        this.openNewChild(metadata);
    }

    protected openNewCharacteristicListItem(item: CharacteristicList) {
        let metadata = new ChildMetadata(CharacteristicListComponent, item,
            this.config.getConfigFor('characteristics'));
        this.openNewChild(metadata);
    }

    protected openNewCapabilityListItem(item: CapabilityList) {
        let metadata = new ChildMetadata(CapabilityListComponent, item, this.config.getConfigFor('capabilities'));
        this.openNewChild(metadata);
    }

    protected openNewAbstractTimeItem(item: AbstractTime) {
        let metadata: ChildMetadata<any>;
        if (item instanceof TimeInstant) {
            metadata = new ChildMetadata(TimeInstantComponent, item,
                this.config.getConfigFor('validTime').getConfigFor('timeInstant'));
        } else if (item instanceof TimePeriod) {
            metadata = new ChildMetadata(TimePeriodComponent, item,
                this.config.getConfigFor('validTime').getConfigFor('timePeriod'));
        }

        this.openNewChild(metadata);
    }

    protected onAddKeywordList() {
        this.model.keywords.push(new KeywordList());
    }

    protected onAddIdentifierList() {
        this.model.identification.push(new IdentifierList());
    }

    protected onAddClassifierList() {
        this.model.classification.push(new ClassifierList());
    }

    protected onAddContactList() {
        this.model.contacts.push(new ContactList());
    }

    protected onAddEventList() {
        this.model.history.push(new EventList());
    }

    protected onAddDocumentList() {
        this.model.documentation.push(new DocumentList());
    }

    protected onAddCharacteristicList() {
        this.model.characteristics.push(new CharacteristicList());
    }

    protected onAddCapabilityList() {
        this.model.capabilities.push(new CapabilityList());
    }

    protected onAddTimeInstant() {
        let instant = new TimeInstant();
        instant.time = new Date();

        this.model.validTime.push(instant);
    }

    protected onAddTimePeriod() {
        let period = new TimePeriod();
        period.begin = new Date();
        period.end = new Date();

        this.model.validTime.push(period);
    }

    protected onRemoveKeywordList(index: number) {
        this.model.keywords.splice(index, 1);
    }

    protected onRemoveClassifierList(index: number) {
        this.model.classification.splice(index, 1);
    }

    protected onRemoveIdentifierList(index: number) {
        this.model.identification.splice(index, 1);
    }

    protected onRemoveContactList(index: number) {
        this.model.contacts.splice(index, 1);
    }

    protected onRemoveEventList(index: number) {
        this.model.history.splice(index, 1);
    }

    protected onRemoveDocumentList(index: number) {
        this.model.documentation.splice(index, 1);
    }

    protected onRemoveCharacteristicList(index: number) {
        this.model.characteristics.splice(index, 1);
    }

    protected onRemoveCapabilityList(index: number) {
        this.model.capabilities.splice(index, 1);
    }

    protected onRemoveAbstractTime(index: number) {
        this.model.validTime.splice(index, 1);
    }

    protected getAbstractTimeTitle(item: AbstractTime) {
        let datePipe = new DatePipe('en');
        let format = 'mediumDate';

        if (item instanceof TimeInstant) {
            return `Time: ${datePipe.transform(item.time, format)}`;
        }

        if (item instanceof TimePeriod) {
            return `Period: ${datePipe.transform(item.begin, format)} - ${datePipe.transform(item.end, format)}`;
        }

        return '';
    }
}
