import {Component, OnInit, Input} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {AbstractProcess, SimpleProcess} from '../model/sml';
import {DescriptionRepository} from '../services/DescriptionRepository';
import {SensorMLPipe} from './pipes/SensorMLPipe';
import {DescribedObjectComponent} from './components/gml/DescribedObjectComponent';

@Component({
  selector: 'editor',
  template: require('./editor.html'),
  styles: [require('./editor.scss')],
  directives: [DescribedObjectComponent],
  pipes: [SensorMLPipe]
})
export class Editor implements OnInit {

  @Input()
  public description: AbstractProcess;
  private id: string;

  constructor(private service: DescriptionRepository,
    routeParams: RouteParams) {
    this.id = routeParams.get('id');
  }

  ngOnInit(): void {
    if (this.id === 'new') {
      this.description = new SimpleProcess();
      this.service.saveDescription(this.description);
    } else {
      this.service.getDescription(this.id)
        .then(description => this.description = description);
    }
  }
}
