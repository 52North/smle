import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Term } from '../../../model/sml/Term';
import { EditorComponent } from '../base/EditorComponent';
import { SelectionResult, VocabSelectionComponent } from '../vocabulary/vocab-selection/vocab-selection.component';

@Component({
  selector: 'sml-term',
  templateUrl: './TermComponent.html',
  styleUrls: ['../styles/editor-component.scss']
})
export class TermComponent extends EditorComponent<Term> {

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    private modalService: NgbModal
  ) {
    super(componentFactoryResolver, viewContainerRef);
  }

  public onClickVocabSelection() {
    const ref = this.modalService.open(VocabSelectionComponent);
    (ref.componentInstance as VocabSelectionComponent).vocabularyConfig = this.componentOptions.vocabularyConfig;
    ref.result.then((result: SelectionResult) => {
      if (result) {
        this.model.definition = result.definition;
        this.model.label = result.label;
        this.model.value = result.value;
      }
    });
  }

  protected createModel(): Term {
    return new Term();
  }
}
