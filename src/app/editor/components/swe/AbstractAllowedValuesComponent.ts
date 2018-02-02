import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { AbstractAllowedValues } from '../../../model/swe/AbstractAllowedValues';

@Component({
    selector: 'swe-abstract-allowed-values',
    templateUrl: './AbstractAllowedValuesComponent.html'
})
export class AbstractAllowedValuesComponent extends TypedModelComponent<AbstractAllowedValues> {
    protected createModel(): AbstractAllowedValues {
        return undefined;
    }
}
