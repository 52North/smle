import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { AbstractSimpleComponent } from '../../../model/swe/AbstractSimpleComponent';
import { AbstractDataComponentComponent } from './AbstractDataComponentComponent';
import { TextFieldComponent } from '../basic/TextFieldComponent';

@Component({
    selector: 'swe-abstract-simple-component',
    template: require('./AbstractSimpleComponentComponent.html')
})
export class AbstractSimpleComponentComponent extends TypedModelComponent<AbstractSimpleComponent> {
    protected createModel(): AbstractSimpleComponent {
        return undefined;
    }
}
