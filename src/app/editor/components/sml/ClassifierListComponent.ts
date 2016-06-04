import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {CardHeaderComponent} from '../CardHeaderComponent';
import {AbstractMetadataListComponent} from '../swe/AbstractMetadataListComponent';
import {Term} from '../../../model/sml/Term';
import {AbstractComponent} from '../AbstractComponent';
import {TermComponent} from './TermComponent';
import {ClassifierList} from '../../../model/sml/ClassifierList';

@Component({
    selector: 'sml-classifier-list',
    template: require('./ClassifierListComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../styles/editor-component.scss')],
    directives: [CardHeaderComponent, AbstractMetadataListComponent]
})
export class ClassifierListComponent extends AbstractComponent<ClassifierList> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): ClassifierList {
        return new ClassifierList();
    }

    private openNewClassifierItem(model: Term) {
        this.openNewChild(TermComponent, model);
    }

    private onAddClassifier(): void {
        this.model.classifiers.push(new Term());
    }

    private onRemoveClassifier(index: number): void {
        this.closeChildWithModel(this.model.classifiers[index]);
        this.model.classifiers.splice(index, 1);
    }
}
