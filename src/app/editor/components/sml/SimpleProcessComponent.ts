import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {CardComponent} from '../basic/CardComponent';
import {EditorComponent} from '../base/EditorComponent';
import {SimpleProcess} from '../../../model/sml/SimpleProcess';
import {AbstractProcessComponent} from './AbstractProcessComponent';

@Component({
    selector: 'sml-simple-process',
    template: require('./SimpleProcessComponent.html'),
    styles: [require('../styles/editor-component.scss')],
    directives: [AbstractProcessComponent, CardComponent]
})
export class SimpleProcessComponent extends EditorComponent<SimpleProcess> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): SimpleProcess {
        return new SimpleProcess();
    }
}
