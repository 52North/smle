import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {CardComponent} from '../basic/CardComponent';
import {AbstractSWEComponent} from '../swe/AbstractSWEComponent';
import {Term} from '../../../model/sml/Term';
import {TypedModelComponent} from '../base/TypedModelComponent';

@Component({
    selector: 'sml-term',
    template: require('./TermComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../styles/editor-component.scss')],
    directives: [CardComponent, AbstractSWEComponent]
})
export class TermComponent extends TypedModelComponent<Term> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): Term {
        return new Term();
    }
}
