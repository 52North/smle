import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const DATE_TIME_SEPARATOR = ' ';

@Component({
    selector: 'date-picker',
    templateUrl: './DatePickerComponent.html'
})
export class DatePickerComponent implements OnChanges {

    @Input()
    public model: Date;

    @Input()
    public minDateTime: Date;

    @Input()
    public maxDateTime: Date;

    @Output()
    public modelChange: EventEmitter<Date> = new EventEmitter<Date>();

    public dateTime: NgbDateStruct;
    public minDate: NgbDateStruct;
    public maxDate: NgbDateStruct;

    public ngOnChanges(changes: { [propertyName: string]: SimpleChange }): any {
        if (changes['model']) {
            const newDate = new NgbDateDateAdapter().fromModel(this.model);
            if (!this.dateTime ||
                (this.dateTime.year !== newDate.year || this.dateTime.month !== newDate.month || this.dateTime.day !== newDate.day)
            ) {
                this.dateTime = newDate;
            }
        }

        if (changes['minDateTime']) {
            this.minDate = new NgbDateDateAdapter().fromModel(this.minDateTime);
        }

        if (changes['maxDateTime']) {
            this.maxDate = new NgbDateDateAdapter().fromModel(this.maxDateTime);
        }
    }

    public onDataChanged(date: NgbDateStruct) {
        this.model = new NgbDateDateAdapter().toModel(date);
        this.modelChange.emit(this.model);
    }

    public onClearDateEntry() {
        this.model = null;
        this.dateTime = null;
        this.modelChange.emit(this.model);
    }

    public onCreateDateEntry() {
        this.model = new Date();
        this.modelChange.emit(this.model);
    }
}

class NgbDateDateAdapter extends NgbDateAdapter<Date> {
    fromModel(value: Date): NgbDateStruct {
        if (value) {
            return {
                day: value.getDate(),
                month: value.getMonth() + 1,
                year: value.getFullYear()
            };
        }
        return null;
    }
    toModel(date: NgbDateStruct): Date {
        if (date) { return new Date(date.year, date.month - 1, date.day); }
        return null;
    }
}
