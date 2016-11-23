import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { KeywordListComponent } from '../sml/KeywordListComponent';
import { IdentifierListComponent } from './IdentifierListComponent';
import { ClassifierListComponent } from './ClassifierListComponent';
import { DocumentListComponent } from './DocumentListComponent';
import { ContactListComponent } from './ContactListComponent';
import { Event } from '../../../model/sml/Event';
import { EditorComponent } from '../base/EditorComponent';
import { IdentifierList } from '../../../model/sml/IdentifierList';
import { ClassifierList } from '../../../model/sml/ClassifierList';
import { ContactList } from '../../../model/sml/ContactList';
import { DocumentList } from '../../../model/sml/DocumentList';
import { KeywordList } from '../../../model/sml/KeywordList';
import { ChildMetadata } from '../base/TypedModelComponent';
import { CodeWithAuthority } from '../../../model/gml/CodeWithAuthority';
import { TimePeriod } from '../../../model/gml/TimePeriod';
import { TimeInstant } from '../../../model/gml/TimeInstant';
import { TimeInstantComponent } from '../gml/TimeInstantComponent';
import { TimePeriodComponent } from '../gml/TimePeriodComponent';
import { SettingsComponent } from './SettingsComponent';
import { Settings } from '../../../model/sml/Settings';

@Component({
    selector: 'sml-event',
    template: require('./EventComponent.html'),
    styles: [require('../styles/editor-component.scss')]
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
        let metadata = new ChildMetadata(KeywordListComponent, item, this.config.getConfigFor('keywords'));
        this.openNewChild(metadata);
    }

    protected onAddKeywordList() {
        this.model.keywords.push(new KeywordList());
    }

    protected onRemoveKeywordList(index: number) {
        this.model.keywords.splice(index, 1);
    }

    protected openNewIdentifierListItem(item: IdentifierList) {
        let metadata = new ChildMetadata(IdentifierListComponent, item, this.config.getConfigFor('identification'));
        this.openNewChild(metadata);
    }

    protected onAddIdentifierList() {
        this.model.identification.push(new IdentifierList());
    }

    protected onRemoveIdentifierList(index: number) {
        this.model.identification.splice(index, 1);
    }

    protected openNewClassifierListItem(item: ClassifierList) {
        let metadata = new ChildMetadata(ClassifierListComponent, item, this.config.getConfigFor('classification'));
        this.openNewChild(metadata);
    }

    protected onAddClassifierList() {
        this.model.classification.push(new ClassifierList());
    }

    protected onRemoveClassifierList(index: number) {
        this.model.classification.splice(index, 1);
    }

    protected openNewContactListItem(item: ContactList) {
        let metadata = new ChildMetadata(ContactListComponent, item, this.config.getConfigFor('contacts'));
        this.openNewChild(metadata);
    }

    protected onAddContactList() {
        this.model.contacts.push(new ContactList());
    }

    protected onRemoveContactList(index: number) {
        this.model.contacts.splice(index, 1);
    }

    protected openNewDocumentListItem(item: DocumentList) {
        let metadata = new ChildMetadata(DocumentListComponent, item, this.config.getConfigFor('documentation'));
        this.openNewChild(metadata);
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
        let metadata = new ChildMetadata(
            TimeInstantComponent,
            item,
            this.config.getConfigFor('time').getConfigFor('timeInstant')
        );
        this.openNewChild(metadata);
    }

    public openTimePeriod(item: TimePeriod): void {
        let metadata = new ChildMetadata(
            TimePeriodComponent,
            item,
            this.config.getConfigFor('time').getConfigFor('timePeriod')
        );
        this.openNewChild(metadata);
    }

    public createTime(): void {
        let time = new TimeInstant();
        time.time = new Date();
        this.model.time = time;
    }

    public createPeriod(): void {
        let period = new TimePeriod();
        period.begin = new Date();
        period.end = new Date();
        this.model.time = period;
    }

    public resetTime() {
        this.model.time = null;
    }

    protected openSettings() {
        let metadata =
            new ChildMetadata(SettingsComponent, this.model.configuration, this.config.getConfigFor('settings'));
        this.openNewChild(metadata);
    }

    protected removeSettings() {
        this.model.configuration = null;
    }

    protected createSettings() {
        this.model.configuration = new Settings();
    }

}
