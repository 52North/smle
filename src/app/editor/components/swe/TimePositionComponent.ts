import {Component} from '@angular/core';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {TimePosition} from '../../../model/swe/TimePosition';
import {DatePickerComponent} from '../gml/DatePickerComponent';

@Component({
    selector: 'swe-time-position',
    template: require('./TimePositionComponent.html'),
    directives: [DatePickerComponent]
})
export class TimePositionComponent extends TypedModelComponent<TimePosition> {


    protected createModel(): TimePosition {
        return new TimePosition();
    }
}
