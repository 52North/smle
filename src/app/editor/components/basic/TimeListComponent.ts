import {Component, Input} from '@angular/core';
import {AbstractTime} from '../../../model/gml/AbstractTime';
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
    public list: AbstractTime[];

    public removeItem(i: number): void {
        this.list.splice(i, 1);
    }

    public addTime(): void {
      let instant = new TimeInstant();
      instant.time = new Date();
      this.list.push(instant);
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

    private onChange(time: AbstractTime, index: number) {
        this.list[index] = time;
    }
}
