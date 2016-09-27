import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import * as moment from 'moment';

const DATE_TIME_SEPARATOR = ' ';

@Component({
    selector: 'date-picker',
    template: require('./DatePickerComponent.html')
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

    private dateTimeString: string;
    // private dateFormat: string = 'dd.mm.yy';
    private momentDateFormat: string = 'DD.MM.YYYY';
    private timeFormat: string = 'HH:mm';

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): any {
        let modelChange = changes['model'];
        if (!modelChange) {
            return;
        }

        let dateTime = this.model;
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

    protected getMinFormattedDate(): string {
        return this.minDateTime ? this.getFormattedDate(this.minDateTime) : null;
    }

    protected getMinFormattedTime(): string {
        let minDate = this.minDateTime;
        let currentDate = this.model;

        if (!minDate) {
            return null;
        }

        return minDate.getFullYear() === currentDate.getFullYear()
            && minDate.getMonth() === currentDate.getMonth()
            && minDate.getDay() === currentDate.getDay()
            ? this.getFormattedTime(minDate)
            : this.getFormattedTime(new Date(0));
    }

    protected getMaxFormattedDate(): string {
        return this.maxDateTime ? this.getFormattedDate(this.maxDateTime) : null;
    }

    protected getMaxFormattedTime(): string {
        let maxDate = this.maxDateTime;
        let currentDate = this.model;

        if (!maxDate) {
            return null;
        }

        return maxDate.getFullYear() === currentDate.getFullYear()
            && maxDate.getMonth() === currentDate.getMonth()
            && maxDate.getDay() === currentDate.getDay()
            ? this.getFormattedTime(new Date(1970, 0, 1, 23, 59, 59))
            : this.getFormattedTime(maxDate);
    }

    protected onStringDateChange(newDateTimeString: string): void {
        let parsedDate = moment(newDateTimeString, 'DD.MM.YYYY HH:mm').toDate();
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
        let timeObject = this.getTimeObject(dateTime);
        return moment(timeObject).format(this.timeFormat);
    }

}
