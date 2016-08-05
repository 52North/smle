import {Component, Input} from '@angular/core';
import {Configuration} from '../../../services/config/Configuration';
import {BaseComponent} from '../base/BaseComponent';

@Component({
    selector: 'text-field',
    template: require('./TextFieldComponent.html')
})
export class TextFieldComponent extends BaseComponent {
    @Input()
    model: Object;

    @Input()
    fieldName: string;

    @Input()
    config: Configuration;

    @Input()
    isShowAll: boolean;
}
