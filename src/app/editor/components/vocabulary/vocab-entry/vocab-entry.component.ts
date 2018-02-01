import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { VocabularyEntry } from '../../../../services/vocabulary/nerc/model';
import { VocabularyService } from '../../../../services/vocabulary/vocabulary.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'vocab-entry',
  templateUrl: './vocab-entry.component.html',
  styleUrls: ['./vocab-entry.component.scss']
})
export class VocabEntryComponent {

  @Input()
  public entry: VocabularyEntry;

  @Input()
  public selectNarrowButtonLabel = 'Select by narrower';

  @Output()
  public selected: EventEmitter<VocabularyEntry> = new EventEmitter();

  @Output()
  public narrowerSelected: EventEmitter<VocabularyEntry> = new EventEmitter();

  constructor(
    private vocab: VocabularyService
  ) { }

  public select(item: VocabularyEntry) {
    this.selected.emit(item);
  }

  public selectByNarrower(item: VocabularyEntry) {
    this.narrowerSelected.emit(item);
  }

}
