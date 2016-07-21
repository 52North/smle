import { Component, ComponentResolver, ViewContainerRef, Input } from '@angular/core';
import { EditorComponent } from '../base/EditorComponent';
import { TimePeriod } from '../../../model/gml/TimePeriod';
import { DatePickerComponent } from './DatePickerComponent';
import { AbstractGMLComponent } from './AbstractGMLComponent';
import { CardComponent } from '../basic/CardComponent';

@Component({
  selector: 'gml-time-period',
  template: require('./TimePeriodComponent.html'),
  directives: [CardComponent, DatePickerComponent, AbstractGMLComponent]
})
export class TimePeriodComponent extends EditorComponent<TimePeriod> {
  @Input()
  public model: TimePeriod;

  constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
    super(componentResolver, viewContainerRef);
  }

  protected createModel() {
    return undefined;
  }


  private onChangeBegin(date: Date) {
    this.model.begin = date;
  }

  private onChangeEnd(date: Date) {
    this.model.end = date;
  }

}
