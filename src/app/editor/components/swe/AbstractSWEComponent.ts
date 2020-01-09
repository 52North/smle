import { Component } from '@angular/core';
import { AbstractSWE } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-abstract',
    templateUrl: './AbstractSWEComponent.html'
})
export class AbstractSWEComponent extends TypedModelComponent<AbstractSWE> {
    protected createModel(): AbstractSWE {
        return undefined;
    }
}
