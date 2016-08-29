import {Component} from '@angular/core';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {AbstractSimpleComponentComponent} from './AbstractSimpleComponentComponent';
import {AllowedValuesComponent} from './AllowedValuesComponent';
import {SweCount} from '../../../model/swe/SweCount';
import {NumberFieldComponent} from '../basic/NumberFieldComponent';

@Component({
    selector: 'swe-count',
    template: require('./SweCountComponent.html'),
    directives: [AbstractSimpleComponentComponent, NumberFieldComponent, AllowedValuesComponent]
})
export class SweCountComponent extends TypedModelComponent<SweCount> {
    protected createModel(): SweCount {
        return new SweCount();
    }
}
