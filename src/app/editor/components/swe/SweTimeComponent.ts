import {Component} from '@angular/core';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {AbstractSimpleComponentComponent} from './AbstractSimpleComponentComponent';
import {UnitOfMeasureComponent} from './UnitOfMeasureComponent';
import {SweTime} from '../../../model/swe/SweTime';
import {TimePositionComponent} from './TimePositionComponent';

@Component({
    selector: 'swe-time',
    template: require('./SweTimeComponent.html'),
    directives: [AbstractSimpleComponentComponent/*, AllowedTimesComponent*/, UnitOfMeasureComponent,
        TimePositionComponent]
})
export class SweTimeComponent extends TypedModelComponent<SweTime> {
    protected createModel(): SweTime {
        return new SweTime();
    }
}
