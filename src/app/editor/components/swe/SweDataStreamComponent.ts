import { Component } from '@angular/core';
import { SweDataStream } from '@helgoland/sensorml';

import { ChildMetadata } from '../base/ChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-data-stream',
    templateUrl: './SweDataStreamComponent.html'
})
export class SweDataStreamComponent extends TypedModelComponent<SweDataStream> {

    protected createModel(): SweDataStream {
        return new SweDataStream();
    }

    public delegateOpenNewChild(childMetadata: ChildMetadata<any>) {
        this.openAsChild.emit(childMetadata);
    }
}
