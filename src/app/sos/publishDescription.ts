import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { PublishDescriptionService } from './publishDescriptionService';
import { SensorMLXmlService } from '../services/SensorMLXmlService';
import { AbstractProcess } from '../model/sml';
import {SensorMLPipe} from '../editor/pipes/SensorMLPipe';

@Component({
  selector: 'sos',
  template: require('./publishDescription.html'),
  styles: [require('./publishDescription.scss')],
  pipes: [SensorMLPipe]
})
export class PublishDescription implements OnInit {

  @Input()
  private sosUrl: string = "http://localhost:8081/52n-sos-webapp/service";

  private description: AbstractProcess;

  constructor(
    private publishServ: PublishDescriptionService) {
  }
  
  ngOnInit() {
    this.description = this.publishServ.getDescription();
  }
  
  hasSosDescription() {
    debugger;
    // TODO check if the SOS has a description with the identifier
    //this.publishServ.hasSosDescription();
  }

}
