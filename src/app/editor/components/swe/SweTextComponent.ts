import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweText } from '../../../model/swe/SweText';

@Component({
    selector: 'swe-text',
    template: require('./SweTextComponent.html')
})
export class SweTextComponent extends TypedModelComponent<SweText> {
    protected createModel(): SweText {
        return new SweText();
    }
}
