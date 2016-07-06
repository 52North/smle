import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {DescribedObject} from '../../../model/sml/DescribedObject';
import {AbstractFeatureComponent} from '../gml/AbstractFeatureComponent';
import {SimpleProcess} from '../../../model/sml/SimpleProcess';
import {KeywordList} from '../../../model/sml/KeywordList';
import {IdentifierList} from '../../../model/sml/IdentifierList';
import {ClassifierList} from '../../../model/sml/ClassifierList';
import {KeywordListComponent} from '../swe/KeywordListComponent';
import {IdentifierListComponent} from './IdentifierListComponent';
import {ClassifierListComponent} from './ClassifierListComponent';
import {CardComponent} from '../basic/CardComponent';
import {ListComponent} from '../basic/ListComponent';
import {ContactListComponent} from './ContactListComponent';
import {ContactList} from '../../../model/sml/ContactList';
import {EditorComponent} from '../base/EditorComponent';
import {TimeListComponent} from '../basic/TimeListComponent';
import {PositionListComponent} from '../basic/PositionListComponent';
import {ChildMetadata} from '../base/TypedModelComponent';

@Component({
    selector: 'sml-described-object',
    template: require('./DescribedObjectComponent.html'),
    styles: [require('../styles/editor-component.scss')],
    directives: [AbstractFeatureComponent, CardComponent, KeywordListComponent, IdentifierListComponent,
        ClassifierListComponent, ContactListComponent, ListComponent, TimeListComponent, PositionListComponent]
})
export class DescribedObjectComponent extends EditorComponent<DescribedObject> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): DescribedObject {
        return new SimpleProcess();
    }

    private openNewKeywordListItem(item: KeywordList) {
        this.openNewChild(KeywordListComponent, item, this.config.getConfigFor('keywords'));
    }

    private openNewIdentifierListItem(item: IdentifierList) {
        this.openNewChild(IdentifierListComponent, item, this.config.getConfigFor('identification'));
    }

    private openNewClassifierListItem(item: ClassifierList) {
        this.openNewChild(ClassifierListComponent, item, this.config.getConfigFor('classification'));
    }

    private openNewContactListItem(item: ContactList) {
        this.openNewChild(ContactListComponent, item, this.config.getConfigFor('contacts'));
    }

    private openChild(event: ChildMetadata) {
        this.openNewChild(event.componentType, event.model, event.config);
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

    private onRemoveKeywordList(index: number) {
        this.closeChildWithModel(this.model.keywords[index]);
        this.model.keywords.splice(index, 1);
    }

    private onRemoveClassifierList(index: number) {
        this.closeChildWithModel(this.model.classification[index]);
        this.model.classification.splice(index, 1);
    }

    private onRemoveIdentifierList(index: number) {
        this.closeChildWithModel(this.model.identification[index]);
        this.model.identification.splice(index, 1);
    }

    private onRemoveContactList(index: number) {
        this.closeChildWithModel(this.model.contacts[index]);
        this.model.contacts.splice(index, 1);
    }
}
