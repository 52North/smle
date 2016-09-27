import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweTime } from '../../../model/swe/SweTime';

@Component({
    selector: 'swe-time',
    template: require('./SweTimeComponent.html')
})
export class SweTimeComponent extends TypedModelComponent<SweTime> {
    protected createModel(): SweTime {
        return new SweTime();
    }
}
