import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {OnlineResource} from '../../../../model/iso/gmd/OnlineResource';
import {TypedModelComponent}  from '../../base/TypedModelComponent';
import {CardComponent} from '../../basic/CardComponent';

@Component({
    selector: 'iso-online-resource',
    template: require('./OnlineResourceComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../../styles/editor-component.scss')],
    directives: [CardComponent]
})
export class OnlineResourceComponent extends TypedModelComponent<OnlineResource> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): OnlineResource {
        return new OnlineResource();
    }
}
