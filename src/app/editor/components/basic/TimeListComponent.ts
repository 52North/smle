import {Component} from '@angular/core';
import {AbstractTime} from '../../../model/gml/AbstractTime';
import {TimePeriod} from '../../../model/gml/TimePeriod';
import {TimeInstantComponent} from '../gml/TimeInstantComponent';
import {TimePeriodComponent} from '../gml/TimePeriodComponent';
import {TimeInstant} from '../../../model/gml/TimeInstant';
import {TypedModelComponent, ChildMetadata} from '../base/TypedModelComponent';

@Component({
    selector: 'time-list',
    template: require('./TimeListComponent.html'),
    directives: [TimeInstantComponent, TimePeriodComponent]
})
export class TimeListComponent extends TypedModelComponent<Array<AbstractTime>> {
    protected createModel() {
        return undefined;
    }

    public removeItem(i: number): void {
        this.model.splice(i, 1);
    }

    public addTime(): void {
        let instant = new TimeInstant();
        instant.time = new Date();
        this.model.push(instant);
    }

    public addPeriod(): void {
        var period = new TimePeriod();
        period.begin = new Date();
        period.end = new Date();
        this.model.push(period);
    }

    public openTimeInstant(item: TimeInstant): void {
        this.openAsChild.emit(new ChildMetadata(TimeInstantComponent, item, this.config.getConfigFor('timeInstant')));
    }

    public openTimePeriod(item: TimePeriod): void {
        this.openAsChild.emit(new ChildMetadata(TimePeriodComponent, item, this.config.getConfigFor('timePeriod')));
    }

    private isPeriod(time: TimePeriod | any): boolean {
        return typeof time.begin !== 'undefined' && typeof time.end !== 'undefined';
    }

    private onChange(time: AbstractTime, index: number) {
        this.model[index] = time;
    }
}
