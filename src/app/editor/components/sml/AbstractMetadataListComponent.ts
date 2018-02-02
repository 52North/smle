import { Component } from '@angular/core';
import { AbstractMetadataList } from '../../../model/sml/AbstractMetadataList';
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
