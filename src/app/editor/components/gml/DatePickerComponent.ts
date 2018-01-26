import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import * as moment from 'moment';

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

    protected dateTimeString: string;
    protected dateFormat: string = 'dd.mm.yy';
    protected timeFormat: string = 'HH:mm';
    private momentDateFormat: string = 'DD.MM.YYYY';

    public ngOnChanges(changes: { [propertyName: string]: SimpleChange }): any {
        const modelChange = changes['model'];
        if (!modelChange) {
            return;
        }

        const dateTime = this.model;
        if (dateTime) {
            this.dateTimeString =
                this.getFormattedDate(dateTime) + DATE_TIME_SEPARATOR + this.getFormattedTime(dateTime);
        }
    }

    public onClearDateEntry() {
        this.model = null;
        this.modelChange.emit(this.model);
    }

    public onCreateDateEntry() {
        this.model = new Date();
        this.modelChange.emit(this.model);
    }

    protected onStringDateChange(newDateTimeString: string): void {
        const parsedDate = moment(newDateTimeString, this.momentDateFormat + ' ' + this.timeFormat).toDate();
        this.dateTimeString = newDateTimeString;
        this.modelChange.emit(parsedDate);
    }

    private getTimeObject(dateTime: Date): any {
        return {
            hour: dateTime.getHours(),
            minute: dateTime.getMinutes()
        };
    }

    private getFormattedDate(dateTime: Date): string {
        return moment(dateTime).format(this.momentDateFormat);
    }

    private getFormattedTime(dateTime: Date): string {
        const timeObject = this.getTimeObject(dateTime);
        return moment(timeObject).format(this.timeFormat);
    }

}
