import {Component, Input} from '@angular/core';
import {AbstractGML} from '../../../model/gml/AbstractGML';
import {CodeTypeComponent} from './CodeTypeComponent';

@Component({
    selector: 'gml-abstract',
    template: require('./AbstractGMLComponent.html'),
    directives: [CodeTypeComponent]
})
export class AbstractGMLComponent {
    @Input()
    public model: AbstractGML;
}
