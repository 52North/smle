import {Component} from '@angular/core';
import {AbstractGML} from '../../../model/gml/AbstractGML';
import {CodeTypeComponent} from './CodeTypeComponent';
import {TypedModelComponent} from '../base/TypedModelComponent';

@Component({
    selector: 'gml-abstract',
    template: require('./AbstractGMLComponent.html'),
    directives: [CodeTypeComponent]
})
export class AbstractGMLComponent extends TypedModelComponent<AbstractGML> {
    protected createModel(): AbstractGML {
        return undefined;
    }
}
