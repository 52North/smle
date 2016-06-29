import { Component, Input, OnInit } from '@angular/core';
import { PublishDescriptionService } from './publishDescriptionService';
import { AbstractProcess } from '../model/sml';
import { SensorMLPipe } from '../editor/pipes/SensorMLPipe';
import { EditorService } from '../services/EditorService';

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

  private errors: Array<string> = [];
  
  private success: string;

  constructor(
    private publishServ: PublishDescriptionService,
    private editorServ: EditorService
  ) {
  }

  ngOnInit() {
    this.description = this.publishServ.getDescription();
  }

  editDescription() {
    this.editorServ.openEditorWithDescription(this.description);
  }

  hasSosDescription() {
    this.resetError();
    this.publishServ.hasSosDescription(this.sosUrl, this.description.identifier.value)
      .subscribe(res => {
        this.hasDescription = res;
      }, (error) => this.handleError(error));
  }

  addDescription() {
    this.resetError();
    this.publishServ.addDescription(this.sosUrl, this.description)
      .subscribe(res => {
        this.success = "Successfully added the description!";
      }, (error) => this.handleError(error));
  }

  updateDescription() {
    this.resetError();
    this.publishServ.updateDescription(this.sosUrl, this.description.identifier.value, this.description)
      .subscribe(res => {
        this.success = "Successfully updated the description!";
      }, error => this.handleError(error));
  }

  private handleError(error) {
    this.errors.length = 0;
    if (typeof error === 'string') this.errors.push(error);
    if (error instanceof Array) this.errors = error;
  }

  private resetError() {
    this.errors.length = 0;
  }

}
