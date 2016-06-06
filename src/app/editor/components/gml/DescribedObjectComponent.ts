import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {DescribedObject} from '../../../model/sml/DescribedObject';
import {AbstractFeatureComponent} from './AbstractFeatureComponent';
import {AbstractComponent} from '../base/AbstractComponent';
import {SimpleProcess} from '../../../model/sml/SimpleProcess';
import {KeywordList} from '../../../model/sml/KeywordList';
import {IdentifierList} from '../../../model/sml/IdentifierList';
import {ClassifierList} from '../../../model/sml/ClassifierList';
import {KeywordListComponent} from '../swe/KeywordListComponent';
import {IdentifierListComponent} from '../sml/IdentifierListComponent';
import {ClassifierListComponent} from '../sml/ClassifierListComponent';
import {CardComponent} from '../basic/CardComponent';
import {ListComponent} from '../basic/ListComponent';
import {ContactListComponent} from '../sml/ContactListComponent';
import {ContactList} from '../../../model/sml/ContactList';

@Component({
    selector: 'gml-described-object',
    template: require('./DescribedObjectComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../styles/editor-component.scss')],
    directives: [AbstractFeatureComponent, CardComponent, KeywordListComponent,
        IdentifierListComponent, ClassifierListComponent, ContactListComponent, ListComponent]
})
export class DescribedObjectComponent extends AbstractComponent<DescribedObject> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): DescribedObject {
        return new SimpleProcess();
    }

    private openNewKeywordListItem(item: KeywordList) {
        this.openNewChild(KeywordListComponent, item);
    }

    private openNewIdentifierListItem(item: IdentifierList) {
        this.openNewChild(IdentifierListComponent, item);
    }

    private openNewClassifierListItem(item: ClassifierList) {
        this.openNewChild(ClassifierListComponent, item);
    }

    private openNewContactListItem(item: ContactList) {
        this.openNewChild(ContactListComponent, item);
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
