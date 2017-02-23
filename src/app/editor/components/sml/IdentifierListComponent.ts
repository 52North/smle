import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Term } from '../../../model/sml/Term';
import { IdentifierList } from '../../../model/sml/IdentifierList';
import { TermComponent } from './TermComponent';
import { EditorComponent, ChildMetadata } from '../base';

@Component({
    selector: 'sml-identifier-list',
    template: require('./IdentifierListComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class IdentifierListComponent extends EditorComponent<IdentifierList> {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): IdentifierList {
        return new IdentifierList();
    }

    protected openNewIdentifierItem(item: Term) {
        let metadata = new ChildMetadata(
            TermComponent, item, this.config.getConfigFor('sml:identifier').getConfigFor('sml:Term')
        );
        this.openNewChild(metadata);
    }

    protected onAddIdentifier(): void {
        this.model.identifiers.push(new Term());
    }

    protected onRemoveIdentifier(index: number): void {
        this.closeChildWithModel(this.model.identifiers[index]);
        this.model.identifiers.splice(index, 1);
    }
}
