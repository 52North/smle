import {Component, Input} from '@angular/core';
import {AbstractSWE} from '../../../model/swe/AbstractSWE';
import {ConfigurableComponent} from '../base/ConfigurableComponent';
import {Configuration} from '../../../services/config/Configuration';

@Component({
    selector: 'swe-abstract',
    template: require('./AbstractSWEComponent.html')
})
export class AbstractSWEComponent extends ConfigurableComponent {
    @Input()
    public model: AbstractSWE;
    @Input()
    public config: Configuration;
}
