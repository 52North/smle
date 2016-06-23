import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {TimeInstant} from '../../../model/gml/TimeInstant';
//import {Calendar} from 'primeng/primeng';

@Component({
    selector: 'gml-time-instant',
    template: require('./TimeInstantComponent.html')//,
    //directives: [Calendar]
})
export class TimeInstantComponent implements OnInit {
    @Input()
    public model: TimeInstant;

    @Output()
    public modelChange: EventEmitter<TimeInstant> = new EventEmitter<TimeInstant>();

    private stringDate: string;
    private dateFormat: string = 'dd.mm.yy';
    private timeFormat: string = 'HH:mm';

    ngOnInit(): any {
        this.stringDate = this.model.toString();
    }

    private onStringDateChange(newStringDate: string): void {
        this.stringDate = newStringDate;
        this.modelChange.emit(new Date(Date.parse(newStringDate)));
    }
}
