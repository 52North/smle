import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweQuantityRange } from '../../../model/swe/SweQuantityRange';

@Component({
    selector: 'swe-quantity-range',
    template: require('./SweQuantityRangeComponent.html')
})
export class SweQuantityRangeComponent extends TypedModelComponent<SweQuantityRange> {
    protected createModel(): SweQuantityRange {
        return new SweQuantityRange();
    }
}
