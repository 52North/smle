import {Component, Input} from '@angular/core';
import {AbstractFeature} from '../../../model/gml/AbstractFeature';
import {AbstractGMLComponent} from './AbstractGMLComponent';
import {ConfigurableComponent} from '../base/ConfigurableComponent';
import {Configuration} from '../../../services/config/Configuration';

@Component({
    selector: 'gml-abstract-feature',
    template: require('./AbstractFeatureComponent.html'),
    directives: [AbstractGMLComponent]
})
export class AbstractFeatureComponent extends ConfigurableComponent {
    @Input()
    public model: AbstractFeature;
    @Input()
    public config: Configuration;
}
