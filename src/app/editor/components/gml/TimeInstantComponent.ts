import {Component, Input, ComponentResolver, ViewContainerRef} from '@angular/core';
import {EditorComponent} from '../base/EditorComponent';
import {TimeInstant} from '../../../model/gml/TimeInstant';
import {CardComponent} from '../basic/CardComponent';
import {DatePickerComponent} from './DatePickerComponent';
import {AbstractGMLComponent} from './AbstractGMLComponent';

@Component({
  selector: 'gml-time-instant',
  template: require('./TimeInstantComponent.html'),
  directives: [CardComponent, DatePickerComponent, AbstractGMLComponent]
})
export class TimeInstantComponent extends EditorComponent<TimeInstant> {
  @Input()
  public model: TimeInstant;

  constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
    super(componentResolver, viewContainerRef);
  }

  protected createModel() {
    return undefined;
  }
}
