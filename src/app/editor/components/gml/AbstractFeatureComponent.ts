import {Component, Input} from '@angular/core';
import {AbstractFeature} from '../../../model/gml/AbstractFeature';
import {AbstractGMLComponent} from './AbstractGMLComponent';

@Component({
    selector: 'gml-abstract-feature',
    template: require('./AbstractFeatureComponent.html'),
    directives: [AbstractGMLComponent]
})
export class AbstractFeatureComponent {
    @Input()
    public model: AbstractFeature;
}
