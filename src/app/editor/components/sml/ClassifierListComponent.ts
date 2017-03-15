import { Component } from '@angular/core';
import { Term } from '../../../model/sml/Term';
import { TermComponent } from './TermComponent';
import { ClassifierList } from '../../../model/sml/ClassifierList';
import { ChildMetadata, TypedModelComponent } from '../base';

@Component({
    selector: 'sml-classifier-list',
    template: require('./ClassifierListComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class ClassifierListComponent extends TypedModelComponent<ClassifierList> {

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
        this.model.classifiers.splice(index, 1);
    }
}
