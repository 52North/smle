import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweBoolean } from '../../../model/swe/SweBoolean';

@Component({
    selector: 'swe-boolean',
    templateUrl: './SweBooleanComponent.html'
})
export class SweBooleanComponent extends TypedModelComponent<SweBoolean> {
    protected createModel(): SweBoolean {
        return new SweBoolean();
    }
}
