import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { AbstractPhysicalProcess } from '../../../model/sml/AbstractPhysicalProcess';
import { ConnectDescriptionService } from '../../../sos/connect/connect.service';

@Component({
    selector: 'sml-abstract-physical-process',
    templateUrl: './AbstractPhysicalProcessComponent.html',
    styleUrls: ['../styles/editor-component.scss'],
})
export class AbstractPhysicalProcessComponent extends TypedModelComponent<AbstractPhysicalProcess> {

    constructor(
        private connectDescriptionService: ConnectDescriptionService
    ) {
        super();
    }

    protected createModel(): AbstractPhysicalProcess {
        return undefined;
    }

    protected changeAttachedTo() {
        this.connectDescriptionService.openAttachedToDescription(this.model);
    }

}
