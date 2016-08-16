import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {Address} from '../../../../model/iso/gmd/Address';
import {CardComponent} from '../../basic/CardComponent';
import {StringsComponent} from '../../basic/StringsComponent';
import {EditorComponent} from '../../base/EditorComponent';
import {TextFieldComponent} from '../../basic/TextFieldComponent';

@Component({
    selector: 'iso-address',
    template: require('./AddressComponent.html'),
    styles: [require('../../styles/editor-component.scss')],
    directives: [CardComponent, StringsComponent, TextFieldComponent]
})
export class AddressComponent extends EditorComponent<Address> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): Address {
        return new Address();
    }
}
