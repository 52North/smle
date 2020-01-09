import { Component } from '@angular/core';
import { SweXmlEncoding } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-xml-encoding',
    templateUrl: './SweXmlEncodingComponent.html'
})
export class SweXmlEncodingComponent extends TypedModelComponent<SweXmlEncoding> {
    protected createModel(): SweXmlEncoding {
        return new SweXmlEncoding();
    }
}
