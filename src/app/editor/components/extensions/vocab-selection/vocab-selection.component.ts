import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { VocabularyEntry } from '../../../../services/vocabulary/nerc/model';
import { VocabularyService } from '../../../../services/vocabulary/vocabulary.service';

@Component({
  selector: 'app-vocab-selection',
  templateUrl: './vocab-selection.component.html',
  styleUrls: ['./vocab-selection.component.scss']
})
export class VocabSelectionComponent implements OnInit {

  public list: VocabularyEntry[];
  public loading: boolean;

  constructor(
    private activeModal: NgbActiveModal,
    private vocab: VocabularyService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.vocab.getIdentificationList().subscribe(
      res => this.list = res,
      error => { },
      () => this.loading = false
    );
  }

  public select(item: VocabularyEntry) {
    this.activeModal.close(item);
  }

  public cancel() {
    this.activeModal.close();
  }

}
