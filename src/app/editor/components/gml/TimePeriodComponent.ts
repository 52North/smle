import { Component, ComponentFactoryResolver, Input, ViewContainerRef } from '@angular/core';

import { TimePeriod } from '../../../model/gml/TimePeriod';
import { EditorComponent } from '../base/EditorComponent';

@Component({
    selector: 'gml-time-period',
    templateUrl: './TimePeriodComponent.html'
})
export class TimePeriodComponent extends EditorComponent<TimePeriod> {
    @Input()
    public model: TimePeriod;

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel() {
        return undefined;
    }


    public onChangeBegin(date: Date) {
        this.model.begin = date;
    }

    public onChangeEnd(date: Date) {
        this.model.end = date;
    }

}
