import {Component, Input} from '@angular/core';
import {AbstractGML} from '../../../model/gml/AbstractGML';
import {CodeTypeComponent} from './CodeTypeComponent';
import {ConfigurableComponent} from '../base/ConfigurableComponent';
import {Configuration} from '../../../services/config/Configuration';

@Component({
    selector: 'gml-abstract',
    template: require('./AbstractGMLComponent.html'),
    directives: [CodeTypeComponent]
})
export class AbstractGMLComponent extends ConfigurableComponent {
    @Input()
    public model: AbstractGML;
    @Input()
    public config: Configuration;
}
