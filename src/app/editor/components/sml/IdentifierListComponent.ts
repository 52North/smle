import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {CardComponent} from '../basic/CardComponent';
import {ListComponent} from '../basic/ListComponent';
import {AbstractMetadataListComponent} from '../swe/AbstractMetadataListComponent';
import {Term} from '../../../model/sml/Term';
import {IdentifierList} from '../../../model/sml/IdentifierList';
import {TermComponent} from './TermComponent';
import {EditorComponent} from '../base/EditorComponent';

@Component({
    selector: 'sml-identifier-list',
    template: require('./IdentifierListComponent.html'),
    styles: [require('../styles/editor-component.scss')],
    directives: [CardComponent, AbstractMetadataListComponent, ListComponent]
})
export class IdentifierListComponent extends EditorComponent<IdentifierList> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): IdentifierList {
        return new IdentifierList();
    }

    private openNewIdentifierItem(model: Term) {
        this.openNewChild(TermComponent, model, this.config.getConfigFor('identifiers'));
    }

    private onAddIdentifier(): void {
        this.model.identifiers.push(new Term());
    }

    private onRemoveIdentifier(index: number): void {
        this.closeChildWithModel(this.model.identifiers[index]);
        this.model.identifiers.splice(index, 1);
    }
}
