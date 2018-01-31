import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { VocabularyEntry } from '../../../../services/vocabulary/nerc/model';
import { TermComponent } from '../../sml/TermComponent';
import { VocabSelectionComponent } from '../vocab-selection/vocab-selection.component';

@Component({
  selector: 'app-vocab-based-term',
  templateUrl: './vocab-based-term.component.html',
  styleUrls: ['./vocab-based-term.component.scss']
})
export class VocabBasedTermComponent extends TermComponent {

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    private modalService: NgbModal
  ) {
    super(componentFactoryResolver, viewContainerRef);
  }

  public onClickVocabSelection() {
    this.modalService.open(VocabSelectionComponent).result.then((result: VocabularyEntry) => {
      if (result) {
        this.model.definition = result.uri;
        this.model.label = result.label;
      }
    });
  }

}
