import {Component, Input} from '@angular/core';
import {CodeType} from '../../../model/gml/CodeType';

@Component({
    selector: 'gml-code-type',
    template: require('./CodeTypeComponent.html')
})
export class CodeTypeComponent {
    @Input()
    public model: CodeType;
}
