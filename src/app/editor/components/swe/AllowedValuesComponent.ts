import {Component} from '@angular/core';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {AllowedValues} from '../../../model/swe/AllowedValues';
import {AbstractNumericAllowedValuesComponent} from './AbstractNumericAllowedValuesComponent';

@Component({
    selector: 'swe-allowed-values',
    template: require('./AllowedValuesComponent.html'),
    directives: [AbstractNumericAllowedValuesComponent]
})
export class AllowedValuesComponent extends TypedModelComponent<AllowedValues> {
    protected createModel(): AllowedValues {
        return new AllowedValues();
    }
}
