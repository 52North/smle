import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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

  constructor(
    private configurationService: ConfigurationService,
    private editorService: EditorService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.editorService.getDescriptionForId(id).then(desc => {
        this.description = desc;
      });
    });
    this.configurationService.getConfiguration().then(configuration => this.config = configuration);
  }
}
