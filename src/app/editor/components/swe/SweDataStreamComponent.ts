import { Component } from '@angular/core';

import { SweDataStream } from '../../../model/swe';
import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-data-stream',
    templateUrl: './SweDataStreamComponent.html'
})
export class SweDataStreamComponent extends TypedModelComponent<SweDataStream> {

    protected createModel(): SweDataStream {
        return new SweDataStream();
    }

}
