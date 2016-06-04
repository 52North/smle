import {Component, Input} from '@angular/core';
import {AbstractSWEIdentifiable} from '../../../model/swe/AbstractSWEIdentifiable';
import {AbstractSWEComponent} from './AbstractSWEComponent';

@Component({
    selector: 'swe-abstract-identifiable',
    template: require('./AbstractSWEIdentifiableComponent.html'),
    directives: [AbstractSWEComponent]
})
export class AbstractSWEIdentifiableComponent {
    @Input()
    public model: AbstractSWEIdentifiable;
}
