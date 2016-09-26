import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweTextEncoding } from '../../../model/swe/SweTextEncoding';
import { SweEncodingComponent } from './SweEncodingComponent';
import { TextFieldComponent } from '../basic/TextFieldComponent';
import { CheckboxComponent } from '../basic/CheckboxComponent';

@Component({
    selector: 'swe-text-encoding',
    template: require('./SweTextEncodingComponent.html')
})
export class SweTextEncodingComponent extends TypedModelComponent<SweTextEncoding> {
    protected createModel(): SweTextEncoding {
        return new SweTextEncoding();
    }
}
