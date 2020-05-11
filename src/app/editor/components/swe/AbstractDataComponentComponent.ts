import { Component } from '@angular/core';
import { AbstractDataComponent } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-abstract-data',
    templateUrl: './AbstractDataComponentComponent.html'
})
export class AbstractDataComponentComponent extends TypedModelComponent<AbstractDataComponent> {
    protected createModel(): AbstractDataComponent {
        return undefined;
    }
}
