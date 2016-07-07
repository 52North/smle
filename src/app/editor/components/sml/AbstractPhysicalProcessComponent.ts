import {Component} from '@angular/core';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {AbstractProcessComponent} from './AbstractProcessComponent';
import {AbstractPhysicalProcess} from '../../../model/sml/AbstractPhysicalProcess';
import {PositionListComponent} from '../basic/PositionListComponent';

@Component({
    selector: 'sml-abstract-physical-process',
    template: require('./AbstractPhysicalProcessComponent.html'),
    directives: [AbstractProcessComponent, PositionListComponent]
})
export class AbstractPhysicalProcessComponent extends TypedModelComponent<AbstractPhysicalProcess> {
    protected createModel(): AbstractPhysicalProcess {
        return undefined;
    }
}
