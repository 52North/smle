import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { VocabularyEntry } from '../../../../services/vocabulary/model';
import { VocabularyService } from '../../../../services/vocabulary/vocabulary.service';

@Component({
  selector: 'vocab-narrower-entry',
  templateUrl: './vocab-narrower-entry.component.html',
  styleUrls: ['./vocab-narrower-entry.component.scss']
})
export class VocabNarrowerEntryComponent implements OnInit {

  @Input()
  public url: string;

  @Output()
  public selected: EventEmitter<VocabularyEntry> = new EventEmitter();

  @Output()
  public narrowerSelected: EventEmitter<VocabularyEntry> = new EventEmitter();

  public narrower: VocabularyEntry;

  constructor(
    private vocab: VocabularyService
  ) { }

  ngOnInit() {
    this.vocab.getNarrower(this.url).subscribe(res => this.narrower = res);
  }

  public onSelected(entry: VocabularyEntry) {
    this.selected.emit(entry);
  }

  public onNarrowerSelected(entry: VocabularyEntry) {
    this.narrowerSelected.emit(entry);
  }

}
