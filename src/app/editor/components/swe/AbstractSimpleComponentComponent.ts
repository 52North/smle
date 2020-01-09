import { Component } from '@angular/core';
import { AbstractSimpleComponent } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-abstract-simple-component',
    templateUrl: './AbstractSimpleComponentComponent.html'
})
export class AbstractSimpleComponentComponent extends TypedModelComponent<AbstractSimpleComponent> {
    protected createModel(): AbstractSimpleComponent {
        return undefined;
    }
}
