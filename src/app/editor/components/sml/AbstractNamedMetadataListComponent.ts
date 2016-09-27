import { Component } from '@angular/core';
import { AbstractNamedMetadataList } from '../../../model/sml/AbstractNamedMetadataList';
import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'sml-abstract-named-metadata-list',
    template: require('./AbstractNamedMetadataListComponent.html')
})
export class AbstractNamedMetadataListComponent extends TypedModelComponent<AbstractNamedMetadataList> {
    protected createModel(): AbstractNamedMetadataList {
        return undefined;
    }
}
