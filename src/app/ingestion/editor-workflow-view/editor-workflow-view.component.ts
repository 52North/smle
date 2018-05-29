import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ChildMetadata } from '../../editor/components/base/ChildMetadata';
import { HostDirective } from '../../editor/components/base/host.directive';
import { EditorComponent } from '../../editor/editor';
import { AbstractProcess, AggregateProcess } from '../../model/sml';
import { EditorService } from '../../services/EditorService';
import { ModalComponentOpenerComponent } from '../modal-component-opener/modal-component-opener.component';

@Component({
  selector: 'app-editor-workflow-view',
  templateUrl: './editor-workflow-view.component.html',
  styleUrls: ['./editor-workflow-view.component.scss']
})
export class EditorWorkflowViewComponent extends EditorComponent implements OnInit {

  public description: AggregateProcess;

  public outputProcess: AbstractProcess;
  public inputProcess: AbstractProcess;
  public csvProcess: AbstractProcess;

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
    const ref = this.modalService.open(ModalComponentOpenerComponent);
    (ref.componentInstance as ModalComponentOpenerComponent).componentType = childMetadata.componentType;
    (ref.componentInstance as ModalComponentOpenerComponent).config = childMetadata.config;
    (ref.componentInstance as ModalComponentOpenerComponent).model = childMetadata.model;
    (ref.componentInstance as ModalComponentOpenerComponent).options = childMetadata.options;
  }

  public changeOutputIdentifer(text: string) {
    this.outputProcess.identifier.value = text;
  }

  public changeCsvIdentifer(text: string) {
    this.csvProcess.identifier.value = text;
  }

  public changeInputIdentifer(text: string) {
    this.inputProcess.identifier.value = text;
  }

  protected updateEditor() {
    super.updateEditor();
    if (this.description.components && this.description.components.components) {
      const outputComp = this.description.components.components.find(entry => entry.name === 'source_output');
      if (outputComp) { this.outputProcess = outputComp.abstractProcess; }

      const inputComp = this.description.components.components.find(entry => entry.name === 'sos_input');
      if (inputComp) { this.inputProcess = inputComp.abstractProcess; }

      const csvComp = this.description.components.components.find(entry => entry.name === 'csv_parameter');
      if (csvComp) { this.csvProcess = csvComp.abstractProcess; }
    }
  }

}
