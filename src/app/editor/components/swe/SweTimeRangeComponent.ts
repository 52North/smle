import {Component} from '@angular/core';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {UnitOfMeasureComponent} from './UnitOfMeasureComponent';
import {SweTimeRange} from '../../../model/swe/SweTimeRange';
import {TimePositionComponent} from './TimePositionComponent';
import {AllowedTimesComponent} from './AllowedTimesComponent';
import {DatePickerComponent} from '../gml/DatePickerComponent';
import {AbstractSweRangeComponent} from './AbstractSweRangeComponent';

@Component({
    selector: 'swe-time-range',
    template: require('./SweTimeRangeComponent.html'),
    directives: [AllowedTimesComponent, UnitOfMeasureComponent,
        TimePositionComponent, DatePickerComponent, AbstractSweRangeComponent]
})
export class SweTimeRangeComponent extends TypedModelComponent<SweTimeRange> {
    protected createModel(): SweTimeRange {
        return new SweTimeRange();
    }
}
