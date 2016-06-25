import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {TimeInstant} from '../../../model/gml/TimeInstant';
import {Calendar} from 'primeng/components/calendar/calendar';

const DATE_TIME_SEPARATOR = ' ';

@Component({
    selector: 'gml-time-instant',
    template: require('./TimeInstantComponent.html'),
    directives: [Calendar]
})
export class TimeInstantComponent implements OnInit {
    @Input()
    public model: TimeInstant;

    @Output()
    public modelChange: EventEmitter<TimeInstant> = new EventEmitter<TimeInstant>();

    private dateTimeString: string;
    private dateFormat: string = 'dd.mm.yy';
    private timeFormat: string = 'HH:mm';

    ngOnInit(): any {
        var timeObject = {
            hour: this.model.getHours(),
            minute: this.model.getMinutes()
        };

        this.dateTimeString = $.datepicker.formatDate(this.dateFormat, this.model)
            + DATE_TIME_SEPARATOR + $.datepicker.formatTime(this.timeFormat, timeObject);
    }

    private onStringDateChange(newDateTimeString: string): void {
        var newDateTimeArray = newDateTimeString.split(DATE_TIME_SEPARATOR);
        var newDateString = newDateTimeArray[0];
        var newTimeString = newDateTimeArray[1];

        var newDate = $.datepicker.parseDate(this.dateFormat, newDateString);
        var newTimeObject = $.datepicker.parseTime(this.timeFormat, newTimeString);

        newDate.setHours(newTimeObject.hour, newTimeObject.minute);

        this.dateTimeString = newDateTimeString;
        this.modelChange.emit(newDate);
    }
}
