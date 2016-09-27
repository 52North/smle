import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { UnitOfMeasure } from '../../../model/swe/UnitOfMeasure';

@Component({
    selector: 'swe-unit-of-measure',
    template: require('./UnitOfMeasureComponent.html')
})
export class UnitOfMeasureComponent extends TypedModelComponent<UnitOfMeasure> {
    protected createModel(): UnitOfMeasure {
        return new UnitOfMeasure();
    }
}
