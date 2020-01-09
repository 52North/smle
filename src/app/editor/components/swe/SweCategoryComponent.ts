import { Component } from '@angular/core';
import { SweCategory } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-category',
    templateUrl: './SweCategoryComponent.html'
})
export class SweCategoryComponent extends TypedModelComponent<SweCategory> {
    protected createModel(): SweCategory {
        return new SweCategory();
    }
}
