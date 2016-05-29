import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {Phone} from '../../../../model/iso/gmd/Phone';
import {AbstractComponent}  from '../../AbstractComponent';
import {CardHeaderComponent} from '../../CardHeaderComponent';
import {StringsComponent} from '../../StringsComponent';

@Component({
    selector: 'iso-phone',
    template: require('./PhoneComponent.html'),
    directives: [CardHeaderComponent, StringsComponent]
})
export class PhoneComponent extends AbstractComponent<Phone> {
    constructor(componentResolver:ComponentResolver, viewContainerRef:ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel():Phone {
        return new Phone();
    }
}
