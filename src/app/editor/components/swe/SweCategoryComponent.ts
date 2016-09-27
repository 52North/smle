import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweCategory } from '../../../model/swe/SweCategory';

@Component({
    selector: 'swe-category',
    template: require('./SweCategoryComponent.html')
})
export class SweCategoryComponent extends TypedModelComponent<SweCategory> {
    protected createModel(): SweCategory {
        return new SweCategory();
    }
}
