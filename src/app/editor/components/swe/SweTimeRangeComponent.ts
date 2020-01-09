import { Component } from '@angular/core';
import { SweTimeRange } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-time-range',
    templateUrl: './SweTimeRangeComponent.html'
})
export class SweTimeRangeComponent extends TypedModelComponent<SweTimeRange> {
    protected createModel(): SweTimeRange {
        return new SweTimeRange();
    }
}
