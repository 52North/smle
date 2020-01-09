import { Component } from '@angular/core';
import { SweEncoding } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-encoding',
    templateUrl: './SweEncodingComponent.html'
})
export class SweEncodingComponent extends TypedModelComponent<SweEncoding> {
    protected createModel(): SweEncoding {
        return undefined;
    }
}
