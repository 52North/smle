import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweCount } from '../../../model/swe/SweCount';

@Component({
    selector: 'swe-count',
    template: require('./SweCountComponent.html')
})
export class SweCountComponent extends TypedModelComponent<SweCount> {
    protected createModel(): SweCount {
        return new SweCount();
    }
}
