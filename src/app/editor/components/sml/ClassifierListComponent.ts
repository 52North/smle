import { Component } from '@angular/core';

import { ClassifierList } from '../../../model/sml/ClassifierList';
import { Term } from '../../../model/sml/Term';
import { ChildMetadata } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { TermComponent } from './TermComponent';

@Component({
    selector: 'sml-classifier-list',
    templateUrl: './ClassifierListComponent.html',
    styleUrls: ['../styles/editor-component.scss']
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
