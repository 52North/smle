import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { ObservableProperty } from '../../../model/sml/ObservableProperty';

@Component({
    selector: 'sml-observable-property',
    templateUrl: './ObservablePropertyComponent.html'
})
export class ObservablePropertyComponent extends TypedModelComponent<ObservableProperty> {

    protected createModel(): ObservableProperty {
        return new ObservableProperty();
    }
}
