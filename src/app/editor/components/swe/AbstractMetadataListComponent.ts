import {Component} from '@angular/core';
import {AbstractMetadataList} from '../../../model/sml/AbstractMetadataList';
import {AbstractSWEIdentifiableComponent} from './AbstractSWEIdentifiableComponent';
import {TypedModelComponent} from '../base/TypedModelComponent';

@Component({
    selector: 'swe-abstract-metadata-list',
    template: require('./AbstractMetadataListComponent.html'),
    directives: [AbstractSWEIdentifiableComponent]
})
export class AbstractMetadataListComponent extends TypedModelComponent<AbstractMetadataList> {
    protected createModel(): AbstractMetadataList {
        return undefined;
    }
}
