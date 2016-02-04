import {Component, Injectable, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {AbstractProcess, SimpleProcess} from '../model/sensorML';
import {DescriptionService} from '../services/description.service';

@Component({
  selector: 'editor',
  template: `
  {{diagnostic}}
  <h2>Description</h2>
  <ul>
    <code>{{description | json}}</code>
  </ul>
  `
})
@Injectable()
export class Editor implements OnInit {
  private _id: string;
  description: AbstractProcess;

  constructor(
    private _service: DescriptionService,
    routeParams: RouteParams) {
    this._id = routeParams.get('id');
  }

  ngOnInit(): void {
    if (this._id === 'new') {
      this.description = new SimpleProcess();
    } else {
      this._service.getDescription(this._id)
        .then(description => this.description = description);
    }
  }
}
