import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { TimePosition } from '../../../model/swe/TimePosition';

@Component({
    selector: 'swe-time-position',
    templateUrl: './TimePositionComponent.html',
    styles: ['label {display: inline-block; margin-bottom: 0;} label:not(:only-child) {margin-bottom: 8px;}']
})
export class TimePositionComponent extends TypedModelComponent<TimePosition> implements OnChanges {
    private dateValue: Date = new Date();

    ngOnChanges(changes: SimpleChanges) {
        const modelChange = changes['model'];
        if (modelChange && this.isDate()) {
            this.dateValue = this.model as Date;
        }
    }

    protected createModel(): TimePosition {
        return new Date();
    }

    protected dateValueChange(value: Date) {
        if (this.isDate()) {
            this.modelChange.emit(value);
        }
    }

    protected onChecked(value) {
        this.modelChange.emit(value);
    }

    private isDate() {
        return this.model instanceof Date;
    }
}
