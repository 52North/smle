import {Component} from '@angular/core';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {AllowedValues} from '../../../model/swe/AllowedValues';
import {AbstractNumericAllowedValuesComponent} from './AbstractNumericAllowedValuesComponent';
import {ListComponent} from "../basic/ListComponent";

@Component({
    selector: 'swe-allowed-values',
    styles: [`list-add-section > .row:first-child {
                margin-bottom: 10px;
    }`],
    template: require('./AllowedValuesComponent.html'),
    directives: [AbstractNumericAllowedValuesComponent, ListComponent]
})
export class AllowedValuesComponent extends TypedModelComponent<AllowedValues> {
    private singleItem: number = 0;
    private pairItem: [number,number] = [0, 0];

    protected createModel(): AllowedValues {
        return new AllowedValues();
    }

    private removeValue(index: number) {
        this.model.values.splice(index, 1);
    }

    private addSingleItem() {
        this.model.values.push(this.singleItem);
        this.singleItem = 0;
    }

    private addPairItem() {
        this.model.values.push(this.pairItem);
        this.pairItem = [0, 0];
    }
}
