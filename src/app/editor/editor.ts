import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractProcess, PhysicalComponent, SimpleProcess, PhysicalSystem } from '../model/sml';
import { ConfigurationService } from '../services/ConfigurationService';
import { SensorMLPipe } from './pipes/SensorMLPipe';
import { PublishDescriptionService } from '../sos/publish/publish.service';
import { Configuration } from '../services/config/Configuration';
import { EditorService } from '../services/EditorService';
import { PhysicalSystemComponent } from './components/sml/PhysicalSystemComponent';
import { PhysicalComponentComponent } from './components/sml/PhysicalComponentComponent';
import { SimpleProcessComponent } from './components/sml/SimpleProcessComponent';
import { ObjectTreeComponent } from './components/basic/ObjectTreeComponent';

enum DescriptionType {
  PhysicalSystem = 1,
  PhysicalComponent = 2,
  SimpleProcess = 3
}

@Component({
  selector: 'editor',
  template: require('./editor.html'),
  styles: [require('./editor.scss')],
  directives: [PhysicalSystemComponent, PhysicalComponentComponent, SimpleProcessComponent,
    ObjectTreeComponent],
  pipes: [SensorMLPipe]
})
export class Editor implements OnInit {

  public description: AbstractProcess;
  public config: Configuration;
  private descriptionType: DescriptionType;

  constructor(
    private publish: PublishDescriptionService,
    private configurationService: ConfigurationService,
    private editorService: EditorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  publishDescription(): void {
    this.publish.setDescription(this.description);
    this.router.navigate(['/publish']);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.editorService.getDescriptionForId(id).then(desc => {
        if (desc != null) {
          this.setDescription(desc);
        }
      });
    });
    this.configurationService.getConfiguration().then(configuration => this.config = configuration);
  }

  public onSelectDescriptionType(type: string) {
    if (type === 'PhysicalSystem') {
      this.setDescription(new PhysicalSystem());
    } else if (type === 'PhysicalComponent') {
      this.setDescription(new PhysicalComponent());
    }
  }

  private setDescription(desc: AbstractProcess) {
    this.description = desc;
    this.descriptionType = this.getDescriptionType(desc);
  }

  private getDescriptionType(desc: AbstractProcess) {
    if (desc instanceof PhysicalSystem) {
      return DescriptionType.PhysicalSystem;
    } else if (desc instanceof PhysicalComponent) {
      return DescriptionType.PhysicalComponent;
    } else if (desc instanceof SimpleProcess) {
      return DescriptionType.SimpleProcess;
    } else {
      return undefined;
    }
  }
}
