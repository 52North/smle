import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { AllowedTimes } from '../../../model/swe/AllowedTimes';
import { TimePosition } from '../../../model/swe/TimePosition';

@Component({
    selector: 'swe-allowed-times',
    templateUrl: './AllowedTimesComponent.html',
    styles: ['.input-wrapper__last {margin-bottom: -12px;} .row:first-child {margin-bottom: 8px;}']
})
export class AllowedTimesComponent extends TypedModelComponent<AllowedTimes> {
    private singleItem: TimePosition = 'now';
    private pairItem: [TimePosition, TimePosition] = ['now', 'now'];

    protected createModel(): AllowedTimes {
        return new AllowedTimes();
    }

    protected removeValue(index: number) {
        this.model.values.splice(index, 1);
    }

    protected addSingleItem() {
        this.model.values.push(this.singleItem);
        this.singleItem = 'now';
    }

    protected addPairItem() {
        this.model.values.push(this.pairItem);
        this.pairItem = ['now', 'now'];
    }
}
