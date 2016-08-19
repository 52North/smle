import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {CardComponent} from '../basic/CardComponent';
import {ListComponent} from '../basic/ListComponent';
import {AbstractMetadataListComponent} from './AbstractMetadataListComponent';
import {Term} from '../../../model/sml/Term';
import {TermComponent} from './TermComponent';
import {ClassifierList} from '../../../model/sml/ClassifierList';
import {EditorComponent} from '../base/EditorComponent';
import {ChildMetadata} from '../base/TypedModelComponent';

@Component({
    selector: 'sml-classifier-list',
    template: require('./ClassifierListComponent.html'),
    styles: [require('../styles/editor-component.scss')],
    directives: [CardComponent, AbstractMetadataListComponent, ListComponent]
})
export class ClassifierListComponent extends EditorComponent<ClassifierList> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): ClassifierList {
        return new ClassifierList();
    }

    private openNewClassifierItem(item: Term) {
        var metadata = new ChildMetadata(TermComponent, item, this.config.getConfigFor('classifiers'));
        this.openNewChild(metadata);
    }

    private onAddClassifier(): void {
        this.model.classifiers.push(new Term());
    }

    private onRemoveClassifier(index: number): void {
        this.closeChildWithModel(this.model.classifiers[index]);
        this.model.classifiers.splice(index, 1);
    }
}
