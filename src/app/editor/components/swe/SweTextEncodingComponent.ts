import { Component } from '@angular/core';
import { SweTextEncoding } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-text-encoding',
    templateUrl: './SweTextEncodingComponent.html'
})
export class SweTextEncodingComponent extends TypedModelComponent<SweTextEncoding> {
    protected createModel(): SweTextEncoding {
        return new SweTextEncoding();
    }
}
