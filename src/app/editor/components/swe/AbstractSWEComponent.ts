import {Component, Input} from '@angular/core';
import {AbstractSWE} from '../../../model/swe/AbstractSWE';

@Component({
    selector: 'abstract-swe',
    template: require('./AbstractSWEComponent.html')
})
export class AbstractSWEComponent {
    @Input()
    public model: AbstractSWE;
}
