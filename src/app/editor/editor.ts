import { Component, Injectable, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import { AbstractProcess, SimpleProcess } from '../model/sml';
import { DescriptionRepository } from '../services/DescriptionRepository';
import { Contact } from '../model/iso';
import * as editorComponents from './components';


const EDITOR_DIRECTIVES = Object.keys(editorComponents)
  .map((key) => editorComponents[key]);

@Component({
  selector: 'editor',
  template: require('./editor.html'),
  directives: [...EDITOR_DIRECTIVES]
})
@Injectable()
export class Editor implements OnInit {
  public description: AbstractProcess;
  private id: string;
  private contact = new Contact();

  constructor(
    private _service: DescriptionRepository,
    routeParams: RouteParams) {
    this.id = routeParams.get('id');

  }

  ngOnInit(): void {
    if (this.id === 'new') {
      this.description = new SimpleProcess();
    } else {
      this._service.getDescription(this.id)
        .then(description => this.description = description);
    }
  }
}
