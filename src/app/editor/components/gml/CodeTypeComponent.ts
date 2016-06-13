import {Component, Input} from '@angular/core';
import {CodeType} from '../../../model/gml/CodeType';
import {ConfigurableComponent} from '../base/ConfigurableComponent';
import {Configuration} from '../../../services/config/Configuration';

@Component({
    selector: 'gml-code-type',
    template: require('./CodeTypeComponent.html')
})
export class CodeTypeComponent extends ConfigurableComponent {
    @Input()
    public model: CodeType;
    @Input()
    public config: Configuration;
}
