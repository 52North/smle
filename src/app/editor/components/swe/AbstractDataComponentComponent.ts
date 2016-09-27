import { TypedModelComponent } from '../base/TypedModelComponent';
import { AbstractDataComponent } from '../../../model/swe/AbstractDataComponent';
import { Component } from '@angular/core';

@Component({
    selector: 'swe-abstract-data',
    template: require('./AbstractDataComponentComponent.html')
})
export class AbstractDataComponentComponent extends TypedModelComponent<AbstractDataComponent> {
    protected createModel(): AbstractDataComponent {
        return undefined;
    }
}
