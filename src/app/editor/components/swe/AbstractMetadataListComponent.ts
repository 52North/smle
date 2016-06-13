import {Component, Input} from '@angular/core';
import {AbstractMetadataList} from '../../../model/sml/AbstractMetadataList';
import {AbstractSWEIdentifiableComponent} from './AbstractSWEIdentifiableComponent';
import {ConfigurableComponent} from '../base/ConfigurableComponent';
import {Configuration} from '../../../services/config/Configuration';

@Component({
    selector: 'swe-abstract-metadata-list',
    template: require('./AbstractMetadataListComponent.html'),
    directives: [AbstractSWEIdentifiableComponent]
})
export class AbstractMetadataListComponent extends ConfigurableComponent {
    @Input()
    public model: AbstractMetadataList;
    @Input()
    public config: Configuration;
}
