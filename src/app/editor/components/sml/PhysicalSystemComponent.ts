import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { PhysicalSystem } from '../../../model/sml/PhysicalSystem';
import { AbstractPhysicalProcessComponent } from './AbstractPhysicalProcessComponent';
import { AggregatingProcessComponent } from './AggregatingProcessComponent';
import { CardComponent } from '../basic/CardComponent';
import { EditorComponent } from '../base/EditorComponent';

@Component({
  selector: 'sml-physical-system',
  template: require('./PhysicalSystemComponent.html'),
  styles: [require('../styles/editor-component.scss')]
})
export class PhysicalSystemComponent extends EditorComponent<PhysicalSystem> {
  constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
    super(componentFactoryResolver, viewContainerRef);
  }

  protected createModel(): PhysicalSystem {
    return new PhysicalSystem();
  }
}
