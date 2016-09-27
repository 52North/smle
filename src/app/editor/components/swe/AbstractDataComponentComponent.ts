import { TypedModelComponent } from '../base/TypedModelComponent';
import { AbstractDataComponent } from '../../../model/swe/AbstractDataComponent';
import { Component } from '@angular/core';
import { TextFieldComponent } from '../basic/TextFieldComponent';
import { CheckboxComponent } from '../basic/CheckboxComponent';
import { AbstractSWEIdentifiableComponent } from './AbstractSWEIdentifiableComponent';

@Component({
    selector: 'swe-abstract-data',
    template: require('./AbstractDataComponentComponent.html')
})
export class AbstractDataComponentComponent extends TypedModelComponent<AbstractDataComponent> {
    protected createModel(): AbstractDataComponent {
        return undefined;
    }
}
