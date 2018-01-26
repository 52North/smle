import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { AbstractPhysicalProcess } from '../../../model/sml/AbstractPhysicalProcess';

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
