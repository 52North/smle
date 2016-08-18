import {Component} from '@angular/core';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {SweXmlEncoding} from '../../../model/swe/SweXmlEncoding';
import {SweEncodingComponent} from './SweEncodingComponent';

@Component({
    selector: 'swe-xml-encoding',
    template: require('./SweXmlEncodingComponent.html'),
    directives: [SweEncodingComponent]
})
export class SweXmlEncodingComponent extends TypedModelComponent<SweXmlEncoding> {
    protected createModel(): SweXmlEncoding {
        return new SweXmlEncoding();
    }
}
