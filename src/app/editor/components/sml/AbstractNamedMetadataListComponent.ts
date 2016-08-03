import {Component} from '@angular/core';
import {AbstractNamedMetadataList} from '../../../model/sml/AbstractNamedMetadataList';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {AbstractMetadataListComponent} from './AbstractMetadataListComponent';

@Component({
    selector: 'swe-abstract-named-metadata-list',
    template: require('./AbstractNamedMetadataListComponent.html'),
    directives: [AbstractMetadataListComponent]
})
export class AbstractNamedMetadataListComponent extends TypedModelComponent<AbstractNamedMetadataList> {
    protected createModel(): AbstractNamedMetadataList {
        return undefined;
    }
}
