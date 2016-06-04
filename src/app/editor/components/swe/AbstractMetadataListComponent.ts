import {Component, Input} from '@angular/core';
import {AbstractMetadataList} from '../../../model/sml/AbstractMetadataList';
import {AbstractSWEIdentifiableComponent} from './AbstractSWEIdentifiableComponent';

@Component({
    selector: 'swe-abstract-metadata-list',
    template: require('./AbstractMetadataListComponent.html'),
    directives: [AbstractSWEIdentifiableComponent]
})
export class AbstractMetadataListComponent {
    @Input()
    public model: AbstractMetadataList;
}
