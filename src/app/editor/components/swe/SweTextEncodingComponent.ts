import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweTextEncoding } from '../../../model/swe/SweTextEncoding';

@Component({
    selector: 'swe-text-encoding',
    templateUrl: './SweTextEncodingComponent.html'
})
export class SweTextEncodingComponent extends TypedModelComponent<SweTextEncoding> {
    protected createModel(): SweTextEncoding {
        return new SweTextEncoding();
    }
}
