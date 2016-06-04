import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {Phone} from '../../../../model/iso/gmd/Phone';
import {AbstractComponent}  from '../../base/AbstractComponent';
import {CardComponent} from '../../basic/CardComponent';
import {StringsComponent} from '../../basic/StringsComponent';

@Component({
    selector: 'iso-phone',
    template: require('./PhoneComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../../styles/editor-component.scss')],
    directives: [CardComponent, StringsComponent]
})
export class PhoneComponent extends AbstractComponent<Phone> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): Phone {
        return new Phone();
    }
}
