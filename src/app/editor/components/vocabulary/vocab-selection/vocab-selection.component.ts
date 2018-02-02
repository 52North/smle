import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { VocabularyType } from '../../../../services/vocabulary/model';
import { VocabularyEntry } from '../../../../services/vocabulary/nerc/model';
import { VocabularyService } from '../../../../services/vocabulary/vocabulary.service';

export interface SelectionResult {
  definition?: string;
  description?: string;
  label?: string;
  value?: string;
}

@Component({
  selector: 'app-vocab-selection',
  templateUrl: './vocab-selection.component.html',
  styleUrls: ['./vocab-selection.component.scss']
})
export class VocabSelectionComponent implements OnInit {

  public vocabType: VocabularyType;
  public list: VocabularyEntry[];
  public loading: boolean;
  public narrower: string[];

  public title: string;
  public selectNarrowButtonLabel: string;

  public history: VocabularyEntry[] = [];

  private firstSelection: VocabularyEntry;

  public page = 1;

  constructor(
    private activeModal: NgbActiveModal,
    private vocab: VocabularyService
  ) { }

  ngOnInit() {
    this.loadBaseVocabularyList();
    this.createBaseTitle();
  }

  public onSelected(item: VocabularyEntry) {
    const result: SelectionResult = {
      definition: item.uri,
      label: item.label,
      description: item.description,
      value: ''
    };
    this.activeModal.close(result);
  }

  public onSelectedANarrower(item: VocabularyEntry) {
    const result: SelectionResult = {
      definition: this.firstSelection.uri,
      label: this.firstSelection.label,
      description: item.description,
      value: item.label
    };
    this.activeModal.close(result);
  }

  public onNarrowSelected(item: VocabularyEntry) {
    if (!this.firstSelection) { this.firstSelection = item; }
    this.history.push(item);
    this.list = null;
    this.setNarrowerList(item);
  }

  public onBreadcrumbSelected(idx: number) {
    this.history = this.history.slice(0, idx + 1);
    this.page = 1;
    this.onNarrowSelected(this.history.pop());
  }

  public cancel() {
    this.activeModal.close();
  }

  private setNarrowerList(item: VocabularyEntry) {
    this.title = item.label;
    this.page = 1;
    this.narrower = item.narrower.filter(e => e.startsWith('http://vocab'));
  }

  private loadBaseVocabularyList() {
    this.list = null;
    this.loading = true;
    this.vocab.getVocabList(this.vocabType).subscribe(res => this.list = res, error => { }, () => this.loading = false);
  }

  private createBaseTitle() {
    switch (this.vocabType) {
      case VocabularyType.Classifier:
        this.title = 'classifier';
        this.selectNarrowButtonLabel = 'Select classifier value';
        break;
      case VocabularyType.Identifier:
        this.title = 'identifier';
        break;
      case VocabularyType.Characteristic:
        this.title = 'characteristic';
        break;
      case VocabularyType.Capability:
        this.title = 'capability';
        break;
      case VocabularyType.Contact:
        this.title = 'contact';
        break;
      case VocabularyType.HistoryEvent:
        this.title = 'history event';
        break;
      default:
        break;
    }
  }

}
