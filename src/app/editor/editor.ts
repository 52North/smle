import { Component, Injectable, OnInit, Input } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { AbstractProcess, SimpleProcess } from '../model/sml';
import { DescriptionRepository } from '../services/DescriptionRepository';
import { ResponsiblePartyComponent } from './components/iso/gmd/ResponsiblePartyComponent';

@Component({
  selector: 'editor',
  template: require('./editor.html'),
  directives: [ResponsiblePartyComponent],
})
export class Editor implements OnInit {
  @Input()
  public description: AbstractProcess;
  private id: string;

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
