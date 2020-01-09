import { Component } from '@angular/core';
import { SweTime } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-time',
    templateUrl: './SweTimeComponent.html'
})
export class SweTimeComponent extends TypedModelComponent<SweTime> {
    protected createModel(): SweTime {
        return new SweTime();
    }
}
