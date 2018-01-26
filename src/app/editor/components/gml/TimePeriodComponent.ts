import { Component, ComponentFactoryResolver, ViewContainerRef, Input } from '@angular/core';
import { EditorComponent } from '../base/EditorComponent';
import { TimePeriod } from '../../../model/gml/TimePeriod';

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


    protected onChangeBegin(date: Date) {
        this.model.begin = date;
    }

    protected onChangeEnd(date: Date) {
        this.model.end = date;
    }

}
