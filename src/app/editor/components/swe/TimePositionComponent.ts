import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {TimePosition} from '../../../model/swe/TimePosition';
import {DatePickerComponent} from '../gml/DatePickerComponent';

@Component({
    selector: 'swe-time-position',
    template: require('./TimePositionComponent.html'),
    styles: ['label {display: inline-block; margin-bottom: 0;} label:not(:only-child) {margin-bottom: 8px;}'],
    directives: [DatePickerComponent]
})
export class TimePositionComponent extends TypedModelComponent<TimePosition> implements OnChanges {
    private dateValue: Date = new Date();

    private isDate() {
        return this.model instanceof Date;
    }

    private dateValueChange(value: Date) {
        if (this.isDate()) {
            this.modelChange.emit(value);
        }
    }


    private onChecked(value) {
        this.modelChange.emit(value);
    }

    ngOnChanges(changes: SimpleChanges) {
        var modelChange = changes['model'];
        if (modelChange && this.isDate()) {
            this.dateValue = <Date>this.model;
        }
    }

    protected createModel(): TimePosition {
        return new Date();
    }
}
