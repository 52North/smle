import { Component } from '@angular/core';
import { AbstractSWEIdentifiable } from '../../../model/swe/AbstractSWEIdentifiable';
import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-abstract-identifiable',
    template: require('./AbstractSWEIdentifiableComponent.html')
})
export class AbstractSWEIdentifiableComponent extends TypedModelComponent<AbstractSWEIdentifiable> {
    protected createModel(): AbstractSWEIdentifiable {
        return undefined;
    }
}
