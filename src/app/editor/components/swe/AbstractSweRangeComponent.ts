import { Component } from '@angular/core';
import { AbstractSweRange } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-abstract-range',
    templateUrl: './AbstractSweRangeComponent.html'
})
export class AbstractSweRangeComponent extends TypedModelComponent<AbstractSweRange> {
    protected createModel(): AbstractSweRange {
        return undefined;
    }
}
