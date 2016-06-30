import {Component, Input} from '@angular/core';
import {TimePeriod} from '../../../model/gml/TimePeriod';
import {TimeInstantComponent} from './TimeInstantComponent';
import {AbstractGMLComponent} from './AbstractGMLComponent';

@Component({
    selector: 'gml-time-period',
    template: require('./TimePeriodComponent.html'),
    directives: [TimeInstantComponent, AbstractGMLComponent]
})
export class TimePeriodComponent {
    @Input()
    public model: TimePeriod;
}
