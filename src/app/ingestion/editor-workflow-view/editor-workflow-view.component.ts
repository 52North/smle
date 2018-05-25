import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ChildMetadata } from '../../editor/components/base/ChildMetadata';
import { HostDirective } from '../../editor/components/base/host.directive';
import { EditorComponent } from '../../editor/editor';
import { EditorService } from '../../services/EditorService';
import { ModalComponentOpenerComponent } from '../modal-component-opener/modal-component-opener.component';

@Component({
  selector: 'app-editor-workflow-view',
  templateUrl: './editor-workflow-view.component.html',
  styleUrls: ['./editor-workflow-view.component.scss']
})
export class EditorWorkflowViewComponent extends EditorComponent implements OnInit {

  @ViewChild(HostDirective)
  public listItemHost: HostDirective;

  constructor(
    editorService: EditorService,
    router: Router,
    route: ActivatedRoute,
    private modalService: NgbModal,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(editorService, router, route);
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  public openChild(childMetadata: ChildMetadata<any>) {

    const model = childMetadata.model;
    const componentType = childMetadata.componentType;
    const config = childMetadata.config;

    const ref = this.modalService.open(ModalComponentOpenerComponent);

    (ref.componentInstance as ModalComponentOpenerComponent).componentType = componentType;
    (ref.componentInstance as ModalComponentOpenerComponent).config = config;
    (ref.componentInstance as ModalComponentOpenerComponent).model = model;
  }



}
