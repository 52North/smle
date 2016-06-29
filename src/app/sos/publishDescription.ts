import { Component, Input, OnInit } from '@angular/core';
import { PublishDescriptionService } from './publishDescriptionService';
import { AbstractProcess } from '../model/sml';
import { SensorMLPipe } from '../editor/pipes/SensorMLPipe';

@Component({
  selector: 'sos',
  template: require('./publishDescription.html'),
  styles: [require('./publishDescription.scss')],
  pipes: [SensorMLPipe]
})
export class PublishDescription implements OnInit {

  @Input()
  private sosUrl: string = 'http://localhost:8081/52n-sos-webapp/service';

  private description: AbstractProcess;

  private hasDescription: boolean = null;

  private publishDescriptionErrors: Array<string> = [];

  constructor(
    private publishServ: PublishDescriptionService) {
  }

  ngOnInit() {
    this.description = this.publishServ.getDescription();
  }

  hasSosDescription() {
    this.publishServ.hasSosDescription(this.sosUrl, this.description.identifier.value).subscribe(res => {
      this.hasDescription = res;
    });
  }

  addDescription() {
    this.publishServ.addDescription(this.sosUrl, this.description)
      .subscribe(res => {
        debugger;
      }, (error: Array<string>) => {
        this.publishDescriptionErrors = error;
      });
  }

  updateDescription() {
    this.publishServ.updateDescription(this.sosUrl, this.description.identifier.value, this.description)
      .subscribe(res => {
        debugger;
      }, (error: Array<string>) => {
        this.publishDescriptionErrors = error;
      });
  }

}
