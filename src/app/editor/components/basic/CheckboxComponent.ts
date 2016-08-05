import {Component, Input} from '@angular/core';
import {Configuration} from '../../../services/config/Configuration';
import {BaseComponent} from '../base/BaseComponent';

@Component({
    selector: 'smle-checkbox',
    template: require('./CheckboxComponent.html')
})
export class CheckboxComponent extends BaseComponent {
    @Input()
    model: Object;

    @Input()
    fieldName: string;

    @Input()
    config: Configuration;

    @Input()
    isShowAll: boolean;
}
