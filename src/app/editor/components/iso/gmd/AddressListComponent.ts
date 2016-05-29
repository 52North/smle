import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {Address} from '../../../../model/iso/gmd/Address';
import {AbstractComponent} from '../../AbstractComponent';
import {AddressComponent} from './AddressComponent';

class AddressList {
    addresses:Address[] = [];
    name:string;
}

@Component({
    selector: 'iso-address-list',
    template: require('./AddressListComponent.html'),
    directives: [AddressComponent]
})
export class AddressListComponent extends AbstractComponent<AddressList> {
    constructor(componentResolver:ComponentResolver, viewContainerRef:ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    public onAdd() {
        this.model.addresses.push(new Address());
    }

    public onRemove(index:number):void {
        this.model.addresses.splice(index, 1);
    }

    protected createModel() {
        return new AddressList();
    }

    protected createModelItem():Address {
        return new Address();
    }

    private openNewAddressItem(model:Address) {
        this.openNewItem(AddressComponent, model);
    }
}
