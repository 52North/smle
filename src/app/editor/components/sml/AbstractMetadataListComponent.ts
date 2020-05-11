import { Component } from '@angular/core';
import { AbstractMetadataList } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'sml-abstract-metadata-list',
    templateUrl: './AbstractMetadataListComponent.html'
})
export class AbstractMetadataListComponent extends TypedModelComponent<AbstractMetadataList> {
    protected createModel(): AbstractMetadataList {
        return undefined;
    }
}
