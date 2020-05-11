import { Component } from '@angular/core';
import { SweCount } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-count',
    templateUrl: './SweCountComponent.html'
})
export class SweCountComponent extends TypedModelComponent<SweCount> {
    protected createModel(): SweCount {
        return new SweCount();
    }
}
