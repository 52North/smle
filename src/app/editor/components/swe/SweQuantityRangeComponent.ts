import { Component } from '@angular/core';
import { SweQuantityRange, UnitOfMeasure, AllowedValues } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-quantity-range',
    templateUrl: './SweQuantityRangeComponent.html'
})
export class SweQuantityRangeComponent extends TypedModelComponent<SweQuantityRange> {
    protected createModel(): SweQuantityRange {
        return new SweQuantityRange();
    }

    protected createUom() {
        this.model.uom = new UnitOfMeasure();
    }

    protected createConstraint() {
        this.model.constraint = new AllowedValues();
    }
}
