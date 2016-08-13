import {Component} from '@angular/core';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {AllowedValuesComponent} from './AllowedValuesComponent';
import {UnitOfMeasureComponent} from './UnitOfMeasureComponent';
import {SweQuantityRange} from '../../../model/swe/SweQuantityRange';
import {AbstractSweRangeComponent} from './AbstractSweRangeComponent';

@Component({
    selector: 'swe-quantity-range',
    template: require('./SweQuantityRangeComponent.html'),
    directives: [AbstractSweRangeComponent, AllowedValuesComponent, UnitOfMeasureComponent]
})
export class SweQuantityRangeComponent extends TypedModelComponent<SweQuantityRange> {
    protected createModel(): SweQuantityRange {
        return new SweQuantityRange();
    }
}
