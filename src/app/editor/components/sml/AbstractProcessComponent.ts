import {Component} from '@angular/core';
import {DescribedObjectComponent} from './DescribedObjectComponent';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {AbstractProcess} from '../../../model/sml/AbstractProcess';

@Component({
    selector: 'sml-abstract-process',
    template: require('./AbstractProcessComponent.html'),
    directives: [DescribedObjectComponent]
})
export class AbstractProcessComponent extends TypedModelComponent<AbstractProcess> {
    protected createModel(): AbstractProcess {
        return undefined;
    }
}
