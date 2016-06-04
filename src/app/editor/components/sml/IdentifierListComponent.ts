import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {CardHeaderComponent} from '../basic/CardHeaderComponent';
import {AbstractMetadataListComponent} from '../swe/AbstractMetadataListComponent';
import {Term} from '../../../model/sml/Term';
import {IdentifierList} from '../../../model/sml/IdentifierList';
import {AbstractComponent} from '../base/AbstractComponent';
import {TermComponent} from './TermComponent';

@Component({
    selector: 'sml-identifier-list',
    template: require('./IdentifierListComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../styles/editor-component.scss')],
    directives: [CardHeaderComponent, AbstractMetadataListComponent]
})
export class IdentifierListComponent extends AbstractComponent<IdentifierList> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): IdentifierList {
        return new IdentifierList();
    }

    private openNewIdentifierItem(model: Term) {
        this.openNewChild(TermComponent, model);
    }

    private onAddIdentifier(): void {
        this.model.identifiers.push(new Term());
    }

    private onRemoveIdentifier(index: number): void {
        this.closeChildWithModel(this.model.identifiers[index]);
        this.model.identifiers.splice(index, 1);
    }
}
