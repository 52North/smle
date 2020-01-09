import { Component } from '@angular/core';
import { AbstractAllowedValues } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-abstract-allowed-values',
    templateUrl: './AbstractAllowedValuesComponent.html'
})
export class AbstractAllowedValuesComponent extends TypedModelComponent<AbstractAllowedValues> {
    protected createModel(): AbstractAllowedValues {
        return undefined;
    }
}
