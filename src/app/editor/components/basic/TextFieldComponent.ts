import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Configuration} from '../../../services/config/Configuration';
import {BaseComponent} from '../base/BaseComponent';

@Component({
    selector: 'text-field',
    template: require('./TextFieldComponent.html')
})
export class TextFieldComponent extends BaseComponent implements OnChanges {
    @Input()
    model: Object;

    @Input()
    fieldName: string;

    @Input()
    config: Configuration;

    @Input()
    isShowAll: boolean;

    ngOnChanges(changes: SimpleChanges): any {
        // if (this.model && this.fieldName && !this.model.hasOwnProperty(this.fieldName)) {
        //     throw new ReferenceError(`${(<any>this.model.constructor).name} has no property "${this.fieldName}"`);
        // }
    }
}
