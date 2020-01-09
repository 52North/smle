import { Component } from '@angular/core';
import { SweQuantity } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-quantity',
    templateUrl: './SweQuantityComponent.html'
})
export class SweQuantityComponent extends TypedModelComponent<SweQuantity> {
    protected createModel(): SweQuantity {
        return new SweQuantity();
    }
}
