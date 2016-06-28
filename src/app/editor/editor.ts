import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {AbstractProcess} from '../model/sml';
import {ConfigurationService} from '../services/ConfigurationService';
import {SensorMLPipe} from './pipes/SensorMLPipe';
import {DescribedObjectComponent} from './components/sml/DescribedObjectComponent';
import {Configuration} from '../services/config/Configuration';
import {EditorService} from '../services/EditorService';

@Component({
  selector: 'editor',
  template: require('./editor.html'),
  styles: [require('./editor.scss')],
  directives: [DescribedObjectComponent],
  pipes: [SensorMLPipe]
})
export class Editor implements OnInit {
  public description: AbstractProcess;
  public config: Configuration;
  private id: string;

  constructor(
    private configurationService: ConfigurationService,
    private editorService: EditorService,
    routeParams: RouteParams) {
    this.id = routeParams.get('id');
  }

  ngOnInit(): void {
    this.editorService.getDescriptionForId(this.id).then(desc => this.description = desc);
    this.configurationService.getConfiguration().then(configuration => this.config = configuration);
  }
}
