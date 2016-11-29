import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Term } from '../../../model/sml/Term';
import { TermComponent } from './TermComponent';
import { ClassifierList } from '../../../model/sml/ClassifierList';
import { EditorComponent } from '../base/EditorComponent';
import { ChildMetadata } from '../base/TypedModelComponent';

@Component({
    selector: 'sml-classifier-list',
    template: require('./ClassifierListComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class ClassifierListComponent extends EditorComponent<ClassifierList> {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): ClassifierList {
        return new ClassifierList();
    }

    protected openNewClassifierItem(item: Term) {
        this.openNewChild(
            new ChildMetadata(TermComponent, item, this.config.getConfigFor('sml:classifiers').getConfigFor('sml:Term'))
        );
    }

    protected onAddClassifier(): void {
        this.model.classifiers.push(new Term());
    }

    protected onRemoveClassifier(index: number): void {
        this.closeChildWithModel(this.model.classifiers[index]);
        this.model.classifiers.splice(index, 1);
    }
}
