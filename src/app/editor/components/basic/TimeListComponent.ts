import {Component, Input} from '@angular/core';
import {Time} from '../../../model/gml/Time';
import {TimePeriod} from '../../../model/gml/TimePeriod';
import {TimeInstantComponent} from '../gml/TimeInstantComponent';
import {TimePeriodComponent} from '../gml/TimePeriodComponent';
import {TimeInstant} from '../../../model/gml/TimeInstant';

@Component({
    selector: 'time-list',
    template: require('./TimeListComponent.html'),
    directives: [TimeInstantComponent, TimePeriodComponent]
})
export class TimeListComponent {
    @Input()
    public list: Time[];

    public removeItem(i: number): void {
        this.list.splice(i, 1);
    }

    public addTime(): void {
        this.list.push(new Date());
    }

    public addPeriod(): void {
        var period = new TimePeriod();

        period.begin = new Date();
        period.end = new Date();

        this.list.push(period);
    }

    private isPeriod(time: TimePeriod | any): boolean {
        return typeof time.begin !== 'undefined' && typeof time.end !== 'undefined';
    }

    private onChange(time: TimeInstant, index: number) {
        this.list[index] = time;
    }
}
