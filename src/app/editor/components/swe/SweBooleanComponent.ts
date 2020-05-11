import { Component } from '@angular/core';
import { SweBoolean } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-boolean',
    templateUrl: './SweBooleanComponent.html'
})
export class SweBooleanComponent extends TypedModelComponent<SweBoolean> {
    protected createModel(): SweBoolean {
        return new SweBoolean();
    }
}
