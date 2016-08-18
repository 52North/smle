import {Component} from '@angular/core';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {SweEncoding} from '../../../model/swe/SweEncoding';
import {AbstractSWEComponent} from './AbstractSWEComponent';

@Component({
    selector: 'swe-encoding',
    template: require('./SweEncodingComponent'),
    directives: [AbstractSWEComponent]
})
export class SweEncodingComponent extends TypedModelComponent<SweEncoding> {
    protected createModel(): SweEncoding {
        return undefined;
    }
}
