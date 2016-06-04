import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {Address} from '../../../../model/iso/gmd/Address';
import {AbstractComponent} from '../../base/AbstractComponent';
import {CardComponent} from '../../basic/CardComponent';
import {StringsComponent} from '../../basic/StringsComponent';

@Component({
    selector: 'iso-address',
    template: require('./AddressComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../../styles/editor-component.scss')],
    directives: [CardComponent, StringsComponent]
})
export class AddressComponent extends AbstractComponent<Address> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): Address {
        return new Address();
    }
}
