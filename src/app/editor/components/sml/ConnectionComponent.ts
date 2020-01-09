import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Connection } from '@helgoland/sensorml';

import { EditorComponent } from '../base/EditorComponent';

@Component({
  selector: 'sml-connection',
  templateUrl: './ConnectionComponent.html',
  styleUrls: ['../styles/editor-component.scss']
})
export class ConnectionComponent extends EditorComponent<Connection> {

  public title = 'Connection';

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    private modalService: NgbModal
  ) {
    super(componentFactoryResolver, viewContainerRef);
  }

  protected createModel(): Connection {
    return new Connection();
  }
}
