import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {TextFieldComponent} from '../basic/TextFieldComponent';
import {CardComponent} from '../basic/CardComponent';
import {SweBinaryComponent} from '../../../model/swe/SweBinaryComponent';
import {EditorComponent} from '../base/EditorComponent';
import {NumberFieldComponent} from '../basic/NumberFieldComponent';
import {AbstractSWEComponent} from './AbstractSWEComponent';

@Component({
    selector: 'swe-binary-component',
    template: require('./SweBinaryComponentComponent.html'),
    styles: [require('../styles/editor-component.scss')],
    directives: [CardComponent, TextFieldComponent, NumberFieldComponent, AbstractSWEComponent]
})
export class SweBinaryComponentComponent extends EditorComponent<SweBinaryComponent> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): SweBinaryComponent {
        return new SweBinaryComponent();
    }
}
