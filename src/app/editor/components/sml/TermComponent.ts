import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Term } from '../../../model/sml/Term';
import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'sml-term',
    template: require('./TermComponent.html'),
    styles: [require('../styles/editor-component.scss')]
})
export class TermComponent extends EditorComponent<Term> {
    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): Term {
        return new Term();
    }
}
