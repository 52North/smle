import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {OnlineResource} from '../../../../model/iso/gmd/OnlineResource';
import {AbstractComponent}  from '../../base/AbstractComponent';
import {CardHeaderComponent} from '../../basic/CardHeaderComponent';
@Component({
    selector: 'iso-online-resource',
    template: require('./OnlineResourceComponent.html'),
    host: {'[class.has-child]': 'hasChild'},
    styles: [require('../../styles/editor-component.scss')],
    directives: [CardHeaderComponent]
})
export class OnlineResourceComponent extends AbstractComponent<OnlineResource> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): OnlineResource {
        return new OnlineResource();
    }
}
