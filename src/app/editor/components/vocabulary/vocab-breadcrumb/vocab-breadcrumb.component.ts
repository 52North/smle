import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { VocabularyEntry } from '../../../../services/vocabulary/model';

@Component({
  selector: 'vocab-breadcrumb',
  templateUrl: './vocab-breadcrumb.component.html',
  styleUrls: ['./vocab-breadcrumb.component.scss']
})
export class VocabBreadcrumbComponent implements OnInit {

  @Input()
  public breadcrumbs: VocabularyEntry[];

  @Output()
  public selectBreadcrumb: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onSelectBreadcrumb(idx: number) {
    this.selectBreadcrumb.emit(idx);
  }

}
