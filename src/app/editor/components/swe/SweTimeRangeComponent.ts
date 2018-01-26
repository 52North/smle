import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweTimeRange } from '../../../model/swe/SweTimeRange';

@Component({
    selector: 'swe-time-range',
    templateUrl: './SweTimeRangeComponent.html'
})
export class SweTimeRangeComponent extends TypedModelComponent<SweTimeRange> {
    protected createModel(): SweTimeRange {
        return new SweTimeRange();
    }
}
