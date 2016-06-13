import {Component, Input} from '@angular/core';
import {AbstractSWEIdentifiable} from '../../../model/swe/AbstractSWEIdentifiable';
import {AbstractSWEComponent} from './AbstractSWEComponent';
import {ConfigurableComponent} from '../base/ConfigurableComponent';
import {Configuration} from '../../../services/config/Configuration';

@Component({
    selector: 'swe-abstract-identifiable',
    template: require('./AbstractSWEIdentifiableComponent.html'),
    directives: [AbstractSWEComponent]
})
export class AbstractSWEIdentifiableComponent extends ConfigurableComponent {
    @Input()
    public model: AbstractSWEIdentifiable;
    @Input()
    public config: Configuration;
}
