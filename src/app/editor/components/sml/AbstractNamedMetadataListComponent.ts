import { Component } from '@angular/core';
import { AbstractNamedMetadataList } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'sml-abstract-named-metadata-list',
    templateUrl: './AbstractNamedMetadataListComponent.html'
})
export class AbstractNamedMetadataListComponent extends TypedModelComponent<AbstractNamedMetadataList> {
    protected createModel(): AbstractNamedMetadataList {
        return undefined;
    }
}
