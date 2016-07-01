import {Component, ComponentResolver, ViewContainerRef, Input, Output, EventEmitter} from '@angular/core';
import {EditorComponent} from '../base/EditorComponent';
import {AbstractTime} from '../../../model/gml/AbstractTime';
import {TimePeriod} from '../../../model/gml/TimePeriod';
import {TimeInstantComponent} from '../gml/TimeInstantComponent';
import {TimePeriodComponent} from '../gml/TimePeriodComponent';
import {TimeInstant} from '../../../model/gml/TimeInstant';
import {Configuration} from '../../../services/config/Configuration';

@Component({
  selector: 'time-list',
  template: require('./TimeListComponent.html'),
  directives: [TimeInstantComponent, TimePeriodComponent]
})
export class TimeListComponent extends EditorComponent<AbstractTime> {
  @Input()
  public list: AbstractTime[];
  @Input()
  public config: Configuration;
  @Output()
  public openAsChild: EventEmitter<any> = new EventEmitter<any>();

  constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
    super(componentResolver, viewContainerRef);
  }

  protected createModel() {
    return undefined;
  }

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

  public openTimeInstant(model: TimeInstant): void {
    this.openAsChild.emit({
      component: TimeInstantComponent,
      model: model,
      config: this.config.getConfigFor('timeInstant')
    })
  }

  public openTimePeriod(model: TimePeriod): void {
    this.openAsChild.emit({
      component: TimePeriodComponent,
      model: model,
      config: this.config.getConfigFor('timePeriod')
    });
  }

  private isPeriod(time: TimePeriod | any): boolean {
    return typeof time.begin !== 'undefined' && typeof time.end !== 'undefined';
  }

  private onChange(time: AbstractTime, index: number) {
    this.list[index] = time;
  }
}
