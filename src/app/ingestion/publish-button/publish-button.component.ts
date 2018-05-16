import { Component, Input, OnInit } from '@angular/core';

import { AbstractProcess } from '../../model/sml';
import { CncService } from '../services/cnc.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublishModalComponent } from '../publish-modal/publish-modal.component';

@Component({
  selector: 'app-publish-button',
  templateUrl: './publish-button.component.html',
  styleUrls: ['./publish-button.component.scss']
})
export class PublishButtonComponent implements OnInit {

  @Input()
  public process: AbstractProcess;

  public publishing: boolean;

  constructor(
    protected cncService: CncService,
    protected modalService: NgbModal
  ) { }

  ngOnInit() { }

  public publish() {
    this.publishing = true;
    this.cncService.publishDescription(this.process).subscribe(
      stream => {
        const ref = this.modalService.open(PublishModalComponent);
        (ref.componentInstance as PublishModalComponent).publishedStream = stream;
        this.publishing = false;
      },
      error => {
        const ref = this.modalService.open(PublishModalComponent);
        (ref.componentInstance as PublishModalComponent).publishError = error;
        this.publishing = false;
      }
    );
  }
}
