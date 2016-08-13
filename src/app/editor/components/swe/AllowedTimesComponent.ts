import {Component} from '@angular/core';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {AllowedTimes} from '../../../model/swe/AllowedTimes';
import {AbstractNumericAllowedValuesComponent} from './AbstractNumericAllowedValuesComponent';
import {ListComponent} from '../basic/ListComponent';
import {TimePositionComponent} from './TimePositionComponent';
import {TimePosition} from '../../../model/swe/TimePosition';
import {TimeIndeterminateValue} from '../../../model/swe/TimeIndeterminateValue';

@Component({
    selector: 'swe-allowed-times',
    template: require('./AllowedTimesComponent.html'),
    styles: ['.input-wrapper__last {margin-bottom: -12px;} .row:first-child {margin-bottom: 8px;}'],
    directives: [AbstractNumericAllowedValuesComponent, ListComponent, TimePositionComponent]
})
export class AllowedTimesComponent extends TypedModelComponent<AllowedTimes> {
    private singleItem: TimePosition = TimeIndeterminateValue;
    private pairItem: [TimePosition, TimePosition] = [TimeIndeterminateValue, TimeIndeterminateValue];

    protected createModel(): AllowedTimes {
        return new AllowedTimes();
    }

    private removeValue(index: number) {
        this.model.values.splice(index, 1);
    }

    private addSingleItem() {
        this.model.values.push(this.singleItem);
        this.singleItem = TimeIndeterminateValue;
    }

    private addPairItem() {
        this.model.values.push(this.pairItem);
        this.pairItem = [TimeIndeterminateValue, TimeIndeterminateValue];
    }
}
