import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {CardHeaderComponent} from '../CardHeaderComponent';
import {ContactList} from '../../../model/sml';
import {ContactListComponent} from './ContactListComponent';
import {AbstractSWEComponent} from '../swe/AbstractSWEComponent';
import {Term} from '../../../model/sml/Term';
import {AbstractComponent} from '../AbstractComponent';

@Component({
    selector: 'sml-term',
    template: require('./TermComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../styles/editor-component.scss')],
    directives: [CardHeaderComponent, AbstractSWEComponent]
})
export class TermComponent extends AbstractComponent<Term> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): Term {
        return new Term();
    }
}
