import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {EditorComponent} from '../base/EditorComponent';
import {NamedSweDataComponent} from '../../../model/sml/NamedSweDataComponent';
import {CardComponent} from '../basic/CardComponent';

@Component({
    selector: 'sml-named-swe-data-component',
    template: require('./NamedSweDataComponentComponent.html'),
    styles: [require('../styles/editor-component.scss')],
    directives: [CardComponent]
})
export class NamedSweDataComponentComponent extends EditorComponent<NamedSweDataComponent> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): NamedSweDataComponent {
        return new NamedSweDataComponent();
    }
}
