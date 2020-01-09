import { Component } from '@angular/core';
import { AbstractPhysicalProcess } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'sml-abstract-physical-process',
    templateUrl: './AbstractPhysicalProcessComponent.html',
    styleUrls: ['../styles/editor-component.scss'],
})
export class AbstractPhysicalProcessComponent extends TypedModelComponent<AbstractPhysicalProcess> {
    protected createModel(): AbstractPhysicalProcess {
        return undefined;
    }
}
