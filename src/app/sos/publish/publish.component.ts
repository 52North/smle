import { Component, Input, OnInit } from '@angular/core';
import { PublishDescriptionService } from './publish.service';
import { AbstractProcess } from '../../model/sml';
import { CodeType } from '../../model/gml/CodeType';
import { SensorMLPipe } from '../../editor/pipes/SensorMLPipe';
import { EditorService } from '../../services/EditorService';
import { SosService } from '../sos.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'publish-description',
  template: require('./publish.template.html'),
  styles: [require('./publish.style.scss')],
  pipes: [SensorMLPipe]
})
export class PublishDescription implements OnInit {

  private description: AbstractProcess;
  private hasDescription: boolean = null;
  private errors: Array<string> = [];
  private success: string;
  private identifier: string;

  constructor(
    private publishServ: PublishDescriptionService,
    private sosService: SosService,
    private editorServ: EditorService
  ) {
  }

  ngOnInit() {
    this.description = this.publishServ.getDescription();
    if (this.description && !this.description.identifier) {
      this.description.identifier = new CodeType('');
    }
  }

  private createUUID() {
    this.identifier = UUID.UUID();
  }

  private useIdentifier() {
    this.description.identifier.value = this.identifier;
    if (!this.description.identifier.codeSpace) {
      this.description.identifier.codeSpace = 'uniqueID';
    }
  }

  private editDescription() {
    this.editorServ.openEditorWithDescription(this.description);
  }

  private hasSosDescription() {
    this.resetError();
    if (this.description && this.description.identifier && this.description.identifier.value) {
      this.sosService.hasSosDescription(this.description.identifier.value)
        .subscribe(res => {
          this.hasDescription = res;
        }, (error) => this.handleError(error));
    }
  }

  private addDescription() {
    this.resetError();
    this.sosService.addDescription(this.description)
      .subscribe(res => {
        this.success = 'Successfully added the description!';
      }, (error) => this.handleError(error));
  }

  private updateDescription() {
    this.resetError();
    this.sosService.updateDescription(this.description.identifier.value, this.description)
      .subscribe(res => {
        this.success = 'Successfully updated the description!';
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
