import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweXmlEncoding } from '../../../model/swe/SweXmlEncoding';

@Component({
    selector: 'swe-xml-encoding',
    templateUrl: './SweXmlEncodingComponent.html'
})
export class SweXmlEncodingComponent extends TypedModelComponent<SweXmlEncoding> {
    protected createModel(): SweXmlEncoding {
        return new SweXmlEncoding();
    }
}
