import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { AbstractNumericAllowedValues } from '../../../model/swe/AbstractNumericAllowedValues';

@Component({
    selector: 'swe-abstract-numeric-allowed-values',
    templateUrl: './AbstractNumericAllowedValuesComponent.html'
})
export class AbstractNumericAllowedValuesComponent extends TypedModelComponent<AbstractNumericAllowedValues> {
    protected createModel(): AbstractNumericAllowedValues {
        return undefined;
    }
}
