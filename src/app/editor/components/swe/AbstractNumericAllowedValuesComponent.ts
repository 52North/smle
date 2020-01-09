import { Component } from '@angular/core';
import { AbstractNumericAllowedValues } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-abstract-numeric-allowed-values',
    templateUrl: './AbstractNumericAllowedValuesComponent.html'
})
export class AbstractNumericAllowedValuesComponent extends TypedModelComponent<AbstractNumericAllowedValues> {
    protected createModel(): AbstractNumericAllowedValues {
        return undefined;
    }
}
