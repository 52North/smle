import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AbstractProcess } from '../../model/sml';
import { PublishModalComponent } from '../publish-modal/publish-modal.component';
import { CncService, DeployStatus } from '../services/cnc.service';
import { IngestionHandlerService } from '../services/handler.service';

@Component({
  selector: 'app-publish-button',
  templateUrl: './publish-button.component.html',
  styleUrls: ['./publish-button.component.scss']
})
export class PublishButtonComponent {

  @Input()
  public process: AbstractProcess;

  public publishing: boolean;

  constructor(
    protected cncService: CncService,
    protected modalService: NgbModal,
    protected ingestionHandler: IngestionHandlerService
  ) { }

  public isUpdatable(): boolean {
    return this.ingestionHandler.streamId !== null;
  }

  public getStreamId(): string {
    return this.ingestionHandler.streamId;
  }

  public publish() {
    this.publishing = true;
    if (this.isUpdatable()) {
      this.cncService.updateDescription(this.getStreamId(), this.process).subscribe(stream => {
        const ref = this.modalService.open(PublishModalComponent);
        (ref.componentInstance as PublishModalComponent).publishedStream = stream;
        this.publishing = false;
      });
    } else {
      this.cncService.publishDescription(this.process).subscribe(
        stream => {
          this.cncService.setDeployStatusDescription(stream.name, DeployStatus.deployed).subscribe(res => {
            const ref = this.modalService.open(PublishModalComponent);
            (ref.componentInstance as PublishModalComponent).publishedStream = stream;
            this.publishing = false;
          });
        },
        error => {
          const ref = this.modalService.open(PublishModalComponent);
          (ref.componentInstance as PublishModalComponent).publishError = error;
          this.publishing = false;
        }
      );
    }
  }
}
