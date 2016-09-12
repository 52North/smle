import { Component, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { EditorComponent } from '../base/EditorComponent';
import { TimeInstant } from '../../../model/gml/TimeInstant';
import { CardComponent } from '../basic/CardComponent';
import { DatePickerComponent } from './DatePickerComponent';
import { AbstractGMLComponent } from './AbstractGMLComponent';

@Component({
  selector: 'gml-time-instant',
  template: require('./TimeInstantComponent.html')
})
export class TimeInstantComponent extends EditorComponent<TimeInstant> {
  @Input()
  public model: TimeInstant;

  constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
    super(componentFactoryResolver, viewContainerRef);
  }

  protected createModel() {
    return undefined;
  }
}
