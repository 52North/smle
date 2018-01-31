import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { CodeWithAuthority } from '../../../model/gml/CodeWithAuthority';
import { TimeInstant } from '../../../model/gml/TimeInstant';
import { TimePeriod } from '../../../model/gml/TimePeriod';
import { ClassifierList } from '../../../model/sml/ClassifierList';
import { ContactList } from '../../../model/sml/ContactList';
import { DocumentList } from '../../../model/sml/DocumentList';
import { Event } from '../../../model/sml/Event';
import { IdentifierList } from '../../../model/sml/IdentifierList';
import { KeywordList } from '../../../model/sml/KeywordList';
import { Settings } from '../../../model/sml/Settings';
import { ChildMetadata } from '../base/ChildMetadata';
import { EditorComponent } from '../base/EditorComponent';
import { NestedChildMetadata } from '../base/NestedChildMetadata';
import { NestedCardComponent } from '../basic/NestedCardComponent';
import { TimeInstantComponent } from '../gml/TimeInstantComponent';
import { TimePeriodComponent } from '../gml/TimePeriodComponent';
import { KeywordListComponent } from '../sml/KeywordListComponent';
import { ClassifierListComponent } from './ClassifierListComponent';
import { ContactListComponent } from './ContactListComponent';
import { DocumentListComponent } from './DocumentListComponent';
import { IdentifierListComponent } from './IdentifierListComponent';
import { SettingsComponent } from './SettingsComponent';

@Component({
    selector: 'sml-event',
    templateUrl: './EventComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class EventComponent extends EditorComponent<Event> {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): Event {
        return new Event();
    }

    protected createDefinition() {
        this.model.definition = new CodeWithAuthority('', '');
    }

    protected resetDefinition() {
        this.model.definition = null;
    }

    protected openNewKeywordListItem(item: KeywordList) {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                KeywordListComponent,
                'Keyword list',
                item,
                this.config.getConfigFor('sml:keywords').getConfigFor('sml:KeywordList')
            )
        );
    }

    protected onAddKeywordList() {
        this.model.keywords.push(new KeywordList());
    }

    protected onRemoveKeywordList(index: number) {
        this.model.keywords.splice(index, 1);
    }

    protected openNewIdentifierListItem(item: IdentifierList) {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                IdentifierListComponent,
                'Identifier list',
                item,
                this.config.getConfigFor('sml:identification').getConfigFor('sml:IdentifierList')
            )
        );
    }

    protected onAddIdentifierList() {
        this.model.identification.push(new IdentifierList());
    }

    protected onRemoveIdentifierList(index: number) {
        this.model.identification.splice(index, 1);
    }

    protected openNewClassifierListItem(item: ClassifierList) {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                ClassifierListComponent,
                'Classifier list',
                item,
                this.config.getConfigFor('sml:classification').getConfigFor('sml:ClassifierList')
            )
        );
    }

    protected onAddClassifierList() {
        this.model.classification.push(new ClassifierList());
    }

    protected onRemoveClassifierList(index: number) {
        this.model.classification.splice(index, 1);
    }

    protected openNewContactListItem(item: ContactList) {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                ContactListComponent,
                'Contact list',
                item,
                this.config.getConfigFor('sml:contacts').getConfigFor('sml:ContactList')
            )
        );
    }

    protected onAddContactList() {
        this.model.contacts.push(new ContactList());
    }

    protected onRemoveContactList(index: number) {
        this.model.contacts.splice(index, 1);
    }

    protected openNewDocumentListItem(item: DocumentList) {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                DocumentListComponent,
                'Document list',
                item,
                this.config.getConfigFor('sml:documentation').getConfigFor('sml:DocumentList')
            )
        );
    }

    protected onAddDocumentList() {
        this.model.documentation.push(new DocumentList());
    }

    protected onRemoveDocumentList(index: number) {
        this.model.documentation.splice(index, 1);
    }

    protected isPeriod(time: TimePeriod | any): boolean {
        return typeof time.begin !== 'undefined' && typeof time.end !== 'undefined';
    }

    public openTimeInstant(item: TimeInstant): void {
        this.openNewChild(
            new ChildMetadata(
                TimeInstantComponent,
                item,
                this.config.getConfigFor('sml:time').getConfigFor('sml:timeInstant')
            )
        );
    }

    public openTimePeriod(item: TimePeriod): void {
        this.openNewChild(
            new ChildMetadata(
                TimePeriodComponent,
                item,
                this.config.getConfigFor('sml:time').getConfigFor('sml:timePeriod')
            )
        );
    }

    public createTime(): void {
        const time = new TimeInstant();
        time.time = new Date();
        this.model.time = time;
    }

    public createPeriod(): void {
        const period = new TimePeriod();
        period.begin = new Date();
        period.end = new Date();
        this.model.time = period;
    }

    public resetTime() {
        this.model.time = null;
    }

    protected openSettings() {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                SettingsComponent,
                'Settings',
                this.model.configuration,
                this.config.getConfigFor('sml:settings')
            )
        );
    }

    protected removeSettings() {
        this.model.configuration = null;
    }

    protected createSettings() {
        this.model.configuration = new Settings();
    }

}
