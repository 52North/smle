import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {Address} from '../../../../model/iso/gmd/Address';
import {AbstractComponent} from '../../AbstractComponent';
import {CardHeaderComponent} from '../../CardHeaderComponent';
import {StringsComponent} from '../../StringsComponent';

@Component({
    selector: 'iso-address',
    template: require('./AddressComponent.html'),
    styles: [require('../../styles/editor-component.scss')],
    directives: [CardHeaderComponent, StringsComponent]
})
export class AddressComponent extends AbstractComponent<Address> {
    constructor(componentResolver:ComponentResolver, viewContainerRef:ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel():Address {
        return new Address();
    }
}
