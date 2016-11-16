import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DescriptionConfig } from '../../../services/config/DescriptionConfig';
import { BaseComponent } from '../base/BaseComponent';

@Component({
    selector: 'number-field',
    template: require('./NumberFieldComponent.html')
})
export class NumberFieldComponent extends BaseComponent implements OnChanges {
    @Input()
    model: Object;
    @Input()
    fieldName: string;
    @Input()
    configName: string;
    @Input()
    config: DescriptionConfig;

    @Input()
    isShowAll: boolean;

    ngOnChanges(changes: SimpleChanges): any {
        // if (this.model && this.fieldName && !this.model.hasOwnProperty(this.fieldName)) {
        //     throw new ReferenceError(`${(<any>this.model.constructor).name} has no property "${this.fieldName}"`);
        // }
    }
}
