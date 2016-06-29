import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractProcess} from '../model/sml';
import {ConfigurationService} from '../services/ConfigurationService';
import {SensorMLPipe} from './pipes/SensorMLPipe';
import {PublishDescriptionService} from '../sos/publishDescriptionService';
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
    private publish: PublishDescriptionService,
    private configurationService: ConfigurationService,
    private editorService: EditorService,
    private route: ActivatedRoute,
    private router: Router
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

  publishDescription(): void {
    this.publish.setDescription(this.description);
    this.router.navigate(['Publish']);
  }
}
