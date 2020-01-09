import { Component } from '@angular/core';
import { SweText } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-text',
    templateUrl: './SweTextComponent.html'
})
export class SweTextComponent extends TypedModelComponent<SweText> {
    protected createModel(): SweText {
        return new SweText();
    }
}
