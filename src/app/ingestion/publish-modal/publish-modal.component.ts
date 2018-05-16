import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Stream } from '../services/cnc.service';

@Component({
  selector: 'app-publish-modal',
  templateUrl: './publish-modal.component.html',
  styleUrls: ['./publish-modal.component.scss']
})
export class PublishModalComponent {

  public publishedStream: Stream;

  public publishError: any;

  constructor(
    protected activeModel: NgbActiveModal
  ) { }

  public close() {
    this.activeModel.close();
  }

}
