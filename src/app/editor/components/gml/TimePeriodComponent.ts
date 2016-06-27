import {Component, Input} from '@angular/core';
import {TimePeriod} from '../../../model/gml/TimePeriod';
import {TimeInstantComponent} from './TimeInstantComponent';

@Component({
    selector: 'gml-time-period',
    template: require('./TimePeriodComponent.html'),
    directives: [TimeInstantComponent]
})
export class TimePeriodComponent {
    @Input()
    public model: TimePeriod;
}
