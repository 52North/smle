import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {Address} from '../../../../model/iso/gmd/Address';
import {AbstractComponent} from '../../base/AbstractComponent';
import {AddressComponent} from './AddressComponent';
import {CardComponent} from '../../basic/CardComponent';
import {ListComponent} from '../../basic/ListComponent';

class AddressList {
    addresses: Address[] = [];
    name: string;
}

@Component({
    selector: 'iso-address-list',
    template: require('./AddressListComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../../styles/editor-component.scss')],
    directives: [CardComponent, AddressComponent, ListComponent]
})
export class AddressListComponent extends AbstractComponent<AddressList> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    public onAdd() {
        this.model.addresses.push(new Address());
    }

    public onRemove(index: number): void {
        this.closeChildWithModel(this.model.addresses[index]);
        this.model.addresses.splice(index, 1);
    }

    protected createModel() {
        return new AddressList();
    }

    protected createModelItem(): Address {
        return new Address();
    }

    private openNewAddressItem(model: Address) {
        this.openNewChild(AddressComponent, model);
    }
}
