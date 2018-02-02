import { DatePipe } from '@angular/common';
import { Component, Type } from '@angular/core';

import { AbstractTime } from '../../../model/gml/AbstractTime';
import { TimeInstant } from '../../../model/gml/TimeInstant';
import { TimePeriod } from '../../../model/gml/TimePeriod';
import { CapabilityList } from '../../../model/sml/CapabilityList';
import { CharacteristicList } from '../../../model/sml/CharacteristicList';
import { ClassifierList } from '../../../model/sml/ClassifierList';
import { ContactList } from '../../../model/sml/ContactList';
import { DescribedObject } from '../../../model/sml/DescribedObject';
import { DocumentList } from '../../../model/sml/DocumentList';
import { EventList } from '../../../model/sml/EventList';
import { IdentifierList } from '../../../model/sml/IdentifierList';
import { KeywordList } from '../../../model/sml/KeywordList';
import { ChildMetadata } from '../base/ChildMetadata';
import { NestedChildMetadata } from '../base/NestedChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { NestedCardComponent } from '../basic/NestedCardComponent';
import { TimeInstantComponent } from '../gml/TimeInstantComponent';
import { TimePeriodComponent } from '../gml/TimePeriodComponent';
import { CapabilityListComponent } from './CapabilityListComponent';
import { CharacteristicListComponent } from './CharacteristicListComponent';
import { ClassifierListComponent } from './ClassifierListComponent';
import { ContactListComponent } from './ContactListComponent';
import { DocumentListComponent } from './DocumentListComponent';
import { EventListComponent } from './EventListComponent';
import { IdentifierListComponent } from './IdentifierListComponent';
import { KeywordListComponent } from './KeywordListComponent';

@Component({
    selector: 'sml-described-object',
    templateUrl: './DescribedObjectComponent.html'
})
export class DescribedObjectComponent extends TypedModelComponent<DescribedObject> {

    public keywordListComponent: Type<any> = KeywordListComponent;
    public identifierListComponent: Type<any> = IdentifierListComponent;
    public classifierListComponent: Type<any> = ClassifierListComponent;
    public characteristicsListComponent: Type<any> = CharacteristicListComponent;
    public capabilityListComponent: Type<any> = CapabilityListComponent;
    public documentListComponent: Type<any> = DocumentListComponent;
    public eventListComponent: Type<any> = EventListComponent;
    public contactListComponent: Type<any> = ContactListComponent;

    protected createModel(): DescribedObject {
        return undefined;
    }

    protected openNewKeywordListItem(item: KeywordList) {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                KeywordListComponent,
                'Keyword List',
                item,
                this.config.getConfigFor('sml:keywords').getConfigFor('sml:KeywordList')
            )
        );
    }

    protected openNewIdentifierListItem(item: IdentifierList) {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                IdentifierListComponent,
                'Identifier List',
                item,
                this.config.getConfigFor('sml:identification').getConfigFor('sml:IdentifierList'),
            )
        );
    }

    protected openNewClassifierListItem(item: ClassifierList) {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                ClassifierListComponent,
                'Classifier List',
                item,
                this.config.getConfigFor('sml:classification').getConfigFor('sml:ClassifierList')
            )
        );
    }

    protected openNewContactListItem(item: ContactList) {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                ContactListComponent,
                'Contact List',
                item,
                this.config.getConfigFor('sml:contacts').getConfigFor('sml:ContactList')
            )
        );
    }

    protected openNewEventListItem(item: EventList) {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                EventListComponent,
                'Event List',
                item,
                this.config.getConfigFor('sml:history').getConfigFor('sml:EventList')
            )
        );
    }

    protected openNewDocumentListItem(item: DocumentList) {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                DocumentListComponent,
                'Document List',
                item,
                this.config.getConfigFor('sml:documentation').getConfigFor('sml:DocumentList')
            )
        );
    }

    protected openNewCharacteristicListItem(item: CharacteristicList) {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                CharacteristicListComponent,
                'Characteristic List',
                item,
                this.config.getConfigFor('sml:characteristics').getConfigFor('sml:CharacteristicList')
            )
        );
    }

    protected openNewCapabilityListItem(item: CapabilityList) {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                CapabilityListComponent,
                'Capability List',
                item,
                this.config.getConfigFor('sml:capabilities').getConfigFor('sml:CapabilitiesList')
            )
        );
    }

    protected openNewAbstractTimeItem(item: AbstractTime) {
        let metadata: ChildMetadata<any>;
        if (item instanceof TimeInstant) {
            metadata = new ChildMetadata(TimeInstantComponent, item,
                this.config.getConfigFor('sml:validTime').getConfigFor('gml:timeInstant'));
        } else if (item instanceof TimePeriod) {
            metadata = new ChildMetadata(TimePeriodComponent, item,
                this.config.getConfigFor('sml:validTime').getConfigFor('gml:timePeriod'));
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
        const instant = new TimeInstant();
        instant.time = new Date();

        this.model.validTime.push(instant);
    }

    protected onAddTimePeriod() {
        const period = new TimePeriod();
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
        const datePipe = new DatePipe('en');
        const format = 'mediumDate';

        if (item instanceof TimeInstant) {
            return `Time: ${datePipe.transform(item.time, format)}`;
        }

        if (item instanceof TimePeriod) {
            return `Period: ${datePipe.transform(item.begin, format)} - ${datePipe.transform(item.end, format)}`;
        }

        return '';
    }
}
