import { Component, Injectable, OnInit, Input } from 'angular2/core';
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
  directives: [...EDITOR_DIRECTIVES],
  providers: [...EDITOR_DIRECTIVES]
})
export class Editor implements OnInit {
  @Input()
  public description: AbstractProcess;
  private id: string;
  private contact = new Contact();

  constructor(
    private service: DescriptionRepository,
    routeParams: RouteParams) {
    this.id = routeParams.get('id');
  }

  ngOnInit(): void {
    if (this.id === 'new') {
      this.description = new SimpleProcess();
    } else {
      this.service.getDescription(this.id)
        .then(description => this.description = description);
    }
  }
}
