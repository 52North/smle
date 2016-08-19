import {Component} from '@angular/core';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {AbstractSimpleComponentComponent} from './AbstractSimpleComponentComponent';
import {AllowedValuesComponent} from './AllowedValuesComponent';
import {UnitOfMeasureComponent} from './UnitOfMeasureComponent';
import {SweQuantity} from '../../../model/swe/SweQuantity';
import {NumberFieldComponent} from '../basic/NumberFieldComponent';

@Component({
    selector: 'swe-quantity',
    template: require('./SweQuantityComponent.html'),
    directives: [AbstractSimpleComponentComponent, NumberFieldComponent, AllowedValuesComponent, UnitOfMeasureComponent]
})
export class SweQuantityComponent extends TypedModelComponent<SweQuantity> {
    protected createModel(): SweQuantity {
        return new SweQuantity();
    }
}
