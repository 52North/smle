import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {Phone} from '../../../../model/iso/gmd/Phone';
import {CardComponent} from '../../basic/CardComponent';
import {StringsComponent} from '../../basic/StringsComponent';
import {EditorComponent} from '../../base/EditorComponent';

@Component({
    selector: 'iso-phone',
    template: require('./PhoneComponent.html'),
    styles: [require('../../styles/editor-component.scss')],
    directives: [CardComponent, StringsComponent]
})
export class PhoneComponent extends EditorComponent<Phone> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): Phone {
        return new Phone();
    }
}
