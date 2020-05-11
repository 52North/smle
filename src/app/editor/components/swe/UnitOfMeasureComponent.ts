import { Component } from '@angular/core';
import { UnitOfMeasure } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-unit-of-measure',
    templateUrl: './UnitOfMeasureComponent.html'
})
export class UnitOfMeasureComponent extends TypedModelComponent<UnitOfMeasure> {
    protected createModel(): UnitOfMeasure {
        return new UnitOfMeasure();
    }
}
