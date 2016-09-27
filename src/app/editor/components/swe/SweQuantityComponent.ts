import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweQuantity } from '../../../model/swe/SweQuantity';

@Component({
    selector: 'swe-quantity',
    template: require('./SweQuantityComponent.html')
})
export class SweQuantityComponent extends TypedModelComponent<SweQuantity> {
    protected createModel(): SweQuantity {
        return new SweQuantity();
    }
}
