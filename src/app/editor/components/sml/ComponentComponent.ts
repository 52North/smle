import * as ngCore from '@angular/core';
import { ComponentFactoryResolver, ViewContainerRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, PhysicalSystem, PhysicalComponent, SimpleProcess, AggregateProcess } from '@helgoland/sensorml';

import { EditorComponent } from '../base/EditorComponent';
import { DescriptionType } from '../../../services/EditorService';

@ngCore.Component({
  selector: 'sml-component',
  templateUrl: './ComponentComponent.html',
  styleUrls: ['../styles/editor-component.scss']
})
export class ComponentComponent extends EditorComponent<Component> implements OnInit {

  public title = 'Component';

  public descriptionType: DescriptionType;

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    private modalService: NgbModal
  ) {
    super(componentFactoryResolver, viewContainerRef);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.determineDescriptionType();
  }

  protected createModel(): Component {
    return new Component();
  }

  private determineDescriptionType() {
    if (this.model.abstractProcess instanceof PhysicalSystem) {
      this.descriptionType = DescriptionType.PhysicalSystem;
    } else if (this.model.abstractProcess instanceof PhysicalComponent) {
      this.descriptionType = DescriptionType.PhysicalComponent;
    } else if (this.model.abstractProcess instanceof SimpleProcess) {
      this.descriptionType = DescriptionType.SimpleProcess;
    } else if (this.model.abstractProcess instanceof AggregateProcess) {
      this.descriptionType = DescriptionType.AggregateProcess;
    } else {
      this.descriptionType = DescriptionType.DynamicGUI;
    }
  }
}
