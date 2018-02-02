import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweQuantityRange, UnitOfMeasure, AllowedValues } from '../../../model/swe';

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
