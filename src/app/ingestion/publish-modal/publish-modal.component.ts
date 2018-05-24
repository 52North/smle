import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    protected activeModel: NgbActiveModal,
    protected router: Router
  ) { }

  public close() {
    this.activeModel.close();
    if (this.publishedStream) {
      this.router.navigate(['/streams']);
    }
  }

}
