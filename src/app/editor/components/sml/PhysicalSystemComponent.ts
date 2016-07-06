import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {PhysicalSystem} from '../../../model/sml/PhysicalSystem';
import {AbstractPhysicalProcessComponent} from './AbstractPhysicalProcessComponent';
import {CardComponent} from '../basic/CardComponent';
import {EditorComponent} from '../base/EditorComponent';

@Component({
    selector: 'sml-physical-system',
    template: require('./PhysicalSystemComponent.html'),
    styles: [require('../styles/editor-component.scss')],
    directives: [AbstractPhysicalProcessComponent, CardComponent]
})
export class PhysicalSystemComponent extends EditorComponent<PhysicalSystem> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): PhysicalSystem {
        return new PhysicalSystem();
    }
}
